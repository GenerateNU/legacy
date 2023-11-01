package services

import (
	"errors"
	"fmt"
	"io"
	"mime/multipart"
	"server/src/models"
	"strconv"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"gorm.io/gorm"
)

var BUCKET_NAME = "generate-legacy-storage"
var ID = "AKIA2WVH6R5ZEMKYG7VW"
var SECRET = "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"

type FileServiceInterface interface {
	GetAllUserFiles(id string) ([]models.File, error)
	GetFile(id string) (models.File, error)
	GetFileObject(id string) ([]byte, string, error)
	GetPresignedURL(id string, days string) (string, error)
	CreateFile(file models.File, data *multipart.FileHeader) (models.File, error)
	DeleteFile(id string) error
}

type FileService struct {
	DB *gorm.DB
}

func createAWSSession() (*session.Session, error) {
	// TODO --> consider caching active session so we dont make f new one every time
	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String("us-east-2"),
		Credentials: credentials.NewStaticCredentials(ID, SECRET, ""),
	})

	if err != nil {
		return nil, err
	}

	return sess, nil
}

func (f *FileService) GetAllUserFiles(id string) ([]models.File, error) {
	var files []models.File

	if err := f.DB.Where("user_id = ?", id).Find(&files).Error; err != nil {
		return nil, err
	}

	return files, nil
}

func (f *FileService) GetFile(id string) (models.File, error) {
	var file models.File

	if err := f.DB.First(&file, id).Error; err != nil {
		return models.File{}, err
	}

	return file, nil
}

func (f *FileService) GetFileObject(id string) ([]byte, string, error) {
	file, err := f.GetFile(id)
	if err != nil {
		return nil, "", err
	}

	sess, err := createAWSSession()
	if err != nil {
		return nil, "", err
	}

	svc := s3.New(sess)
	key := fmt.Sprintf("%v-%v", file.UserID, file.FileName)

	fileResponse, err := svc.GetObject(&s3.GetObjectInput{
		Bucket: aws.String(BUCKET_NAME),
		Key:    aws.String(key),
	})

	if err != nil {
		return nil, "", err
	}

	defer fileResponse.Body.Close()

	fileContent, err := io.ReadAll(fileResponse.Body)
	if err != nil {
		return nil, "", err
	}

	return fileContent, file.FileName, nil
}

func (f *FileService) GetPresignedURL(id string, days string) (string, error) {
	file, err := f.GetFile(id)
	if err != nil {
		return "", err
	}

	// create session and service client, then create presigned url
	sess, err := createAWSSession()
	if err != nil {
		return "", err
	}

	svc := s3.New(sess)
	objectKey := fmt.Sprintf("%v-%v", file.UserID, file.FileName)

	req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String(BUCKET_NAME),
		Key:    aws.String(objectKey),
	})

	daysInt, err := strconv.Atoi(days)
	if err != nil {
		return "", err
	}
	expiration := time.Duration(24*time.Hour) * time.Duration(daysInt)

	url, err := req.Presign(expiration)
	if err != nil {
		return "", err
	}

	return url, nil
}

func (f *FileService) CreateFile(file models.File, data *multipart.FileHeader) (models.File, error) {
	file.FileName = data.Filename
	file.UserID = 1

	// Check if the file size is greater than 5 MB
	if data.Size > 5000000 {
		return models.File{}, errors.New("maximum file size 5 MB")
	}

	src, err := data.Open()
	if err != nil {
		return models.File{}, errors.New("failed to open file")
	}
	defer src.Close()

	// Upload the file to the S3 bucket
	sess, err := createAWSSession()
	if err != nil {
		return models.File{}, errors.New("failed to create AWS session")
	}

	uploader := s3manager.NewUploader(sess)
	filename := fmt.Sprintf("%v-%v", file.UserID, file.FileName)

	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(BUCKET_NAME),
		Key:    aws.String(filename),
		Body:   src,
	})
	if err != nil {
		return models.File{}, errors.New("failed to upload file to S3 bucket")
	}

	// Create the file in the database
	if err := f.DB.Create(&file).Error; err != nil {
		return models.File{}, errors.New("failed to create file in database")
	}

	return file, nil
}

func (f *FileService) DeleteFile(id string) error {
	var file models.File

	if err := f.DB.First(&file, id).Error; err != nil {
		return err
	}

	// create session and service client, then delete file
	sess, err := createAWSSession()
	if err != nil {
		return err
	}

	svc := s3.New(sess)
	objectKey := fmt.Sprintf("%v-%v", file.UserID, file.FileName)

	_, err = svc.DeleteObject(&s3.DeleteObjectInput{
		Bucket: aws.String(BUCKET_NAME),
		Key:    aws.String(objectKey),
	})
	if err != nil {
		return err
	}

	if err := f.DB.Delete(&file).Error; err != nil {
		return err
	}

	return nil
}
