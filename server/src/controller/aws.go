package controller

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"server/src/model"
	"strconv"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/go-playground/validator"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type AwsController struct {
	DB *gorm.DB
}

func createAwsSession() (*session.Session, error) {
	// TODO --> consider caching active session so we dont make a new one every time
	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String("us-east-2"),
		Credentials: credentials.NewStaticCredentials("AKIA2WVH6R5ZEMKYG7VW", "kOQ4kRX6UWbDjlW8MqItnrJgR2UrMRXgD4V2vend", ""),
	})

	if err != nil {
		return nil, err
	}

	return sess, nil
}

func (a *AwsController) CreateFile(c echo.Context) error {
	var file model.File
	jsonString := c.FormValue("file_info")

	// bind data sent in POST request to file model
	if err := json.Unmarshal([]byte(jsonString), &file); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	// check if binded data is valid according to rules defined in model
	validator := validator.New()
	if err := validator.Struct(file); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	// check if file exists
	var checkFile model.File
	result := a.DB.Where("file_name = ?", file.FileName).Where("user_id = ?", file.UserID).First(&checkFile)
	if result.Error == nil {
		return c.JSON(http.StatusNotAcceptable, "Filename already exists")
	}

	// file info validated, now upload to s3 bucket
	sess, err := createAwsSession()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	// define upload parameters
	uploader := s3manager.NewUploader(sess)
	bucket := "generate-legacy-storage"
	filename := fmt.Sprintf("%v-%v", file.UserID, file.FileName)
	data, err := c.FormFile("file_data")

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	// open file to be uploaded
	src, err := data.Open()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	defer src.Close()

	// upload file
	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(filename),
		Body:   src,
	})

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	// once file uploads successfully, update table in DB
	a.DB.Create(&file)

	return c.JSON(http.StatusCreated, file)
}

func (a *AwsController) GetFile(c echo.Context) error {
	// attempt to locate file in DB
	var dbFile model.File
	fileID := c.Param("id")
	result := a.DB.First(&dbFile, fileID)

	// check if file exists
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return c.JSON(http.StatusNotFound, "File not found")
	}

	// create session and service client
	sess, err := createAwsSession()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	svc := s3.New(sess)

	// define parameters to get file
	bucketName := "generate-legacy-storage"
	key := fmt.Sprintf("%v-%v", dbFile.UserID, dbFile.FileName)

	// download file from s3 bucket
	file, err := svc.GetObject(&s3.GetObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(key),
	})

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	defer file.Body.Close()

	// configure response to send file
	c.Response().Header().Set("Content-Type", "application/octet-stream")
	c.Response().Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=%s", key))

	// stream s3 object body to HTTP response
	_, err = io.Copy(c.Response().Writer, file.Body)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return nil
}

func (a *AwsController) DeleteFile(c echo.Context) error {
	// attempt to locate file in DB
	var file model.File
	fileID := c.Param("id")
	result := a.DB.First(&file, fileID)

	// check if file exists
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return c.JSON(http.StatusNotFound, "File not found")
	}

	// create session and service client, then delete file
	sess, err := createAwsSession()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	svc := s3.New(sess)

	bucketName := "generate-legacy-storage"
	objectKey := fmt.Sprintf("%v-%v", file.UserID, file.FileName)

	_, err = svc.DeleteObject(&s3.DeleteObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(objectKey),
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	// delete file from DB after successful removal from AWS
	a.DB.Delete(&file)

	return c.JSON(http.StatusOK, "File deleted")
}

func (a *AwsController) GetPresignedURL(c echo.Context) error {
	// attempt to locate file in DB
	var file model.File
	fileID := c.Param("id")
	result := a.DB.First(&file, fileID)

	// check if file exists
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return c.JSON(http.StatusNotFound, "File not found")
	}

	// create session and service client, then create presigned url
	sess, err := createAwsSession()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	svc := s3.New(sess)

	bucketName := "generate-legacy-storage"
	objectKey := fmt.Sprintf("%v-%v", file.UserID, file.FileName)

	req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(objectKey),
	})

	// set URL expiration and get url
	days, err := strconv.Atoi(c.Param("days"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid expiration time. Expecting integer days")
	}
	expiration := time.Duration(24*time.Hour) * time.Duration(days)

	url, err := req.Presign(expiration)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, url)
}

func (a *AwsController) dump(c echo.Context) error {

	// Create new session
	sess, err := createAwsSession()
	if err != nil {
		exitErrorf("Unable to create session: ", err)
	}

	// create s3 service client
	svc := s3.New(sess)

	result, err := svc.ListBuckets(nil)
	if err != nil {
		exitErrorf("Unable to list buckets, ", err)
	}

	fmt.Println("Buckets:")
	for _, b := range result.Buckets {
		fmt.Printf("* %s created on %s\n",
			aws.StringValue(b.Name), aws.TimeValue(b.CreationDate))
	}

	return c.JSON(http.StatusOK, result)

}

func exitErrorf(s string, err error) {
	panic(s)
}
