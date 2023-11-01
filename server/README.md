# Backend Installs & Learning References

### Installations

**Go**

- [Installing Go (Golang)](https://golang.org/doc/install)

**Echo Web Framework for Go**

- [Getting started with Echo](https://echo.labstack.com/)

### Learning References

#### Go (Golang)

- [Official Go Documentation](https://golang.org/doc/)

- [Effective Go](https://golang.org/doc/effective_go.html)

- [Go by Example](https://gobyexample.com/)

#### Echo Web Framework

- [Echo Guide](https://echo.labstack.com/docs/category/guide)

- [Echo Cookbook](https://echo.labstack.com/docs/category/cookbook)

#### Go Testing

- [Testing in Go](https://golang.org/doc/tutorial/add-a-test)

#### GORM

- [GORM Guide](https://gorm.io/docs/)

#### Rest API Design

- [REST API Tutorial](https://restfulapi.net/)

- [REST API Best Practices](https://www.freecodecamp.org/news/rest-api-best-practices-rest-endpoint-design-examples/)



Certainly! Below is how you can organize the code into a Controller, Service, and Route, following the example you provided:

### 1. **File Model**
The file model remains unchanged.

```go
type File struct {
    gorm.Model
    FileName        string `gorm:"type:varchar(255)" json:"file_name" validate:"required"`
    FileDescription string `gorm:"type:text" json:"file_description" validate:"required"`
    FilePath        string `gorm:"type:varchar(255)" json:"file_path" validate:"required"`
    UserID          uint   `json:"user_id" validate:"required"`
    User            *User  `gorm:"foreignkey:UserID" json:"-"`
}
```

### 2. **File Service**
The service will handle the business logic related to files.

```go
package services

import (
    "server/src/models"
    "gorm.io/gorm"
)

type FileServiceInterface interface {
    CreateFile(file models.File, userID uint) error
    GetFile(fileID uint) (models.File, error)
    DeleteFile(fileID uint) error
    GetAllFiles(userID uint) ([]models.File, error)
    // Add more methods as needed
}

type FileService struct {
    DB *gorm.DB
}

// Implement the methods from FileServiceInterface
```

### 3. **File Controller**
The controller will handle HTTP requests and responses.

```go
package controllers

import (
    "net/http"
    "server/src/services"
    "github.com/labstack/echo/v4"
)

type FileController struct {
    fileService services.FileServiceInterface
}

func NewFileController(fileService services.FileServiceInterface) *FileController {
    return &FileController{fileService: fileService}
}

// Implement handlers such as CreateFile, GetFile, DeleteFile, etc.
```

### 4. **File Routes**
Define the routes for handling file-related requests.

```go
func FileRoutes(g *echo.Group, fileService services.FileServiceInterface) {
    fileController := controllers.NewFileController(fileService)

    g.POST("/", fileController.CreateFile)
    g.GET("/:fid", fileController.GetFile)
    g.DELETE("/:fid", fileController.DeleteFile)
    g.GET("/user/:uid", fileController.GetAllFiles)
    // Add more routes as needed
}
```

### 5. **Remaining AWS-specific functions**
You can consider creating a utility or helper package where you keep AWS-specific functionalities like `createAwsSession()`, or you could incorporate them into the service layer as private methods.

### Conclusion
- **Model**: Structure representing the data.
- **Service**: Contains the business logic and interactions with the database.
- **Controller**: Handles HTTP requests, calling the appropriate services.
- **Routes**: Defines the HTTP routes and endpoints.

You might also want to create a separate utility or helper for AWS-specific operations. This organization follows a clean architecture, separating concerns and making the codebase easier to manage and extend. Note that the actual implementation inside the methods (e.g., interactions with the database and AWS services) should be written based on your application's specific needs and logic.

Certainly! Below is the detailed implementation of the handlers, methods for services, controllers, and utilities/helpers.

### **Utilities/Helpers (AWS Specific Operations)**

```go
package utils

import (
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/credentials"
    "github.com/aws/aws-sdk-go/aws/session"
)

func CreateAWSSession() (*session.Session, error) {
    sess, err := session.NewSession(&aws.Config{
        Region:      aws.String("us-east-2"),
        Credentials: credentials.NewStaticCredentials("YOUR_ACCESS_KEY", "YOUR_SECRET_KEY", ""),
    })

    return sess, err
}
```

### **File Service**

```go
package services

import (
    "errors"
    "server/src/models"
    "gorm.io/gorm"
    // Import other necessary packages like AWS SDK
)

type FileService struct {
    DB *gorm.DB
    // You can also inject the AWS utility here if necessary
}

func (fs *FileService) CreateFile(file models.File) error {
    // Your code for creating a file goes here. This could involve:
    // - Validating the file
    // - Saving it to AWS S3
    // - Saving file metadata to your database

    return nil // or return an error if something goes wrong
}

func (fs *FileService) GetFile(fileID uint) (models.File, error) {
    var file models.File

    result := fs.DB.First(&file, fileID)
    if result.Error != nil {
        return file, errors.New("file not found")
    }

    return file, nil
}

// Implement other methods like DeleteFile, GetAllFiles, etc.
```

### **File Controller**

```go
package controllers

import (
    "net/http"
    "server/src/services"
    "github.com/labstack/echo/v4"
)

type FileController struct {
    fileService services.FileService
}

func (fc *FileController) CreateFile(c echo.Context) error {
    // Your code for handling the creation of a file goes here.
    // This could involve:
    // - Receiving file data from a client
    // - Calling the fileService.CreateFile method

    return c.JSON(http.StatusCreated, "File successfully created")
}

func (fc *FileController) GetFile(c echo.Context) error {
    fileID := c.Param("fid") // getting file ID from the route parameter

    file, err := fc.fileService.GetFile(fileID)
    if err != nil {
        return c.JSON(http.StatusNotFound, err.Error())
    }

    return c.JSON(http.StatusOK, file)
}

// Implement other handlers like DeleteFile, GetAllFiles, etc.
```

### **Routes**

```go
func FileRoutes(g *echo.Group, fileService services.FileService) {
    fileController := controllers.NewFileController(fileService)

    g.POST("/", fileController.CreateFile)
    g.GET("/:fid", fileController.GetFile)
    // Define other routes like DELETE, PUT, etc.
}
```

### **Explanation**
- **Utilities/Helpers**: A utility function to create an AWS session.
- **Service**: Handles the business logic, interacts with the database and AWS.
- **Controller**: Receives HTTP requests, communicates with services, and returns HTTP responses.
- **Routes**: Defines the HTTP endpoints and connects them to the controller functions.

Make sure to replace `"YOUR_ACCESS_KEY"` and `"YOUR_SECRET_KEY"` in the utility function with your actual AWS credentials. Additionally, you might need to customize the error handling, validation, and other business logic according to your specific use case and error handling strategy.