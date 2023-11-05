package controllers

import (
	"net/http"
	"server/src/models"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

type FileController struct {
	fileService services.FileServiceInterface
}

func NewFileController(fileService services.FileServiceInterface) *FileController {
	return &FileController{fileService: fileService}
}

func (f *FileController) GetAllFiles(c echo.Context) error {
	file, err := f.fileService.GetAllFiles()
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch files")
	}

	return c.JSON(http.StatusOK, file)
}

func (f *FileController) GetAllUserFiles(c echo.Context) error {
	userID := c.Param("uid")
	file, err := f.fileService.GetAllUserFiles(userID)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch files")
	}

	return c.JSON(http.StatusOK, file)
}

func (f *FileController) GetFileTag(c echo.Context) error {
	fileID := c.Param("fid")
	tag, err := f.fileService.GetFileTag(fileID)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch tags")
	}

	return c.JSON(http.StatusOK, tag)
}

func (f *FileController) GetPresignedURL(c echo.Context) error {
	fileID := c.Param("fid")
	days := c.QueryParam("days")

	if days == "" {
		days = "1"
	}

	url, err := f.fileService.GetPresignedURL(fileID, days)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to get presigned url")
	}

	return c.JSON(http.StatusOK, url)
}

func (f *FileController) CreateFile(c echo.Context) error {
	var file models.File
	userID := c.Param("uid")

	if err := c.Bind(&file); err != nil {
		return err
	}

	if err := services.ValidateData(c, file); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to validate the data"+err.Error())
	}

	form, err := c.MultipartForm()
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to get form")
	}

	fileResponse := form.File["file_data"][0]

	file, err = f.fileService.CreateFile(userID, file, fileResponse)
	if err != nil {
		return c.JSON(http.StatusNotFound, err.Error())
	}

	return c.JSON(http.StatusOK, file)
}

func (f *FileController) DeleteFile(c echo.Context) error {
	fileID := c.Param("fid")

	if err := f.fileService.DeleteFile(fileID); err != nil {
		return c.JSON(http.StatusNotFound, "Failed to delete file")
	}

	return c.JSON(http.StatusOK, "File deleted")
}
