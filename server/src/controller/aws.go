package controller

import (
	"fmt"
	"net/http"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"

	"os"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type AwsController struct {
	DB *gorm.DB
}

func (u *AwsController) dump(c echo.Context) error {
	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String("us-east-2"),
		Credentials: credentials.NewStaticCredentials("AKIA2WVH6R5ZEMKYG7VW", "kOQ4kRX6UWbDjlW8MqItnrJgR2UrMRXgD4V2vend", ""),
	})
	if err != nil {
		exitErrorf("Unable to connect to s3, ", err)
	}

	// Create S3 service client
	svc := s3.New(sess)
	result, err2 := svc.ListBuckets(nil)
	if err2 != nil {
		exitErrorf("Unable to list buckets, ", err2)
	}
	fmt.Println("Buckets:")
	for _, b := range result.Buckets {
		fmt.Printf("* %s created on %s\n",
			aws.StringValue(b.Name), aws.TimeValue(b.CreationDate))
	}

	uploader := s3manager.NewUploader(sess)
	bucket := "generate-legacy-storage"
	filename := "test"
	data, err := os.Open("test.txt")

	if err != nil {
		// Print the error and exit.
		exitErrorf("Cannot open file", err)
	}

	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(filename),
		Body:   data,
	})

	if err != nil {
		// Print the error and exit.
		exitErrorf("Unable to upload "+filename+" to "+bucket, err)
	}

	fmt.Printf("Successfully uploaded %q to %q\n", filename, bucket)
	return c.JSON(http.StatusOK, result)
}

func exitErrorf(s string, err error) {
	panic(s)
}
