package services

import (
	"errors"
	"fmt"
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
	GetAllFiles() ([]models.File, error)
	GetFile(id string) (models.File, error)
	GetFilename(id string) (string, error)
	GetAllUserFiles(id string) ([]models.File, error)
	GetAllUserFilesWithTag(id string, tag []string) ([]models.File, error)
	GetFileURL(id string, days string) (string, error)
	CreateFile(id string, file models.File, data *multipart.FileHeader) (models.File, error)
	DeleteFile(id string) error
}

type FileService struct {
	DB *gorm.DB
}

func createAWSSession() (*session.Session, error) {
	// TODO:--> consider caching active session so we dont make f new one every time
	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String("us-east-2"),
		Credentials: credentials.NewStaticCredentials(ID, SECRET, ""),
	})

	if err != nil {
		return nil, err
	}

	return sess, nil
}

func (f *FileService) GetFilename(id string) (string, error) {

	file, err := f.GetFile(id)
	if err != nil {
		return "", err
	}

	return file.FileName, nil
}

func (f *FileService) GetAllFiles() ([]models.File, error) {
	var files []models.File

	if err := f.DB.Find(&files).Error; err != nil {
		return nil, err
	}

	return files, nil
}

func (f *FileService) GetAllUserFilesWithTag(id string, tag []string) ([]models.File, error) {
	var files []models.File

	if err := f.DB.Table("files").
		Joins("JOIN file_tags ON file_tags.file_id = files.id").
		Joins("JOIN tags ON file_tags.tag_id = tags.id").
		Where("tags.name IN (?) AND files.user_id = ?", tag, id).
		Find(&files).Error; err != nil {
		return nil, err
	}

	return files, nil
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

func (f *FileService) GetFileURL(id string, days string) (string, error) {
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

	req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String(BUCKET_NAME),
		Key:    aws.String(file.ObjectKey),
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

func (f *FileService) CreateFile(id string, file models.File, data *multipart.FileHeader) (models.File, error) {
	var testFile models.File
	file.FileName = data.Filename
	idInt, err := strconv.Atoi(id)
	if err != nil {
		return models.File{}, errors.New("failed to convert id to int")
	}
	file.UserID = uint(idInt)

	// check if filename is already taken
	file.ObjectKey = fmt.Sprintf("%v-%v", file.UserID, file.FileName)
	if err := f.DB.Where("object_key = ?", file.ObjectKey).Find(&testFile).Error; err == nil {
		return models.File{}, errors.New("file name already exists")
	}

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

	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(BUCKET_NAME),
		Key:    aws.String(file.ObjectKey),
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

func (f *FileService) GeneratePDF(uid string, fileJSON string) (models.File, error) {
	return models.File{}, nil
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

	// Required to delete the file from the database permanently
	if err := f.DB.Unscoped().Delete(&file).Error; err != nil {
		return err
	}

	return nil
}
