package controller

import (
	"net/http"
	"server/src/model"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type SubTaskProgressController struct {
	DB *gorm.DB
}

func (s *SubTaskProgressController) GetAllSubTaskProgress(c echo.Context) error {
	var progress []model.SubTaskProgress

	s.DB.Find(&progress)
	return c.JSON(http.StatusOK, progress)
}

func (s *SubTaskProgressController) GetSubTaskProgress(c echo.Context) error {
	var progress model.SubTaskProgress
	progressID := c.Param("id")

	s.DB.First(&progress, progressID)

	if progress.ID == 0 {
		return c.JSON(http.StatusNotFound, "Progress not found")
	}

	return c.JSON(http.StatusOK, progress)
}

func (s *SubTaskProgressController) CreateSubTaskProgress(c echo.Context) error {
	var progress model.SubTaskProgress

	if err := c.Bind(&progress); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	validator := validator.New()

	if err := validator.Struct(progress); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	s.DB.Create(&progress)

	return c.JSON(http.StatusCreated, progress)
}

func (s *SubTaskProgressController) UpdateSubTaskProgress(c echo.Context) error {
	var progress model.SubTaskProgress
	progressID := c.Param("id")

	s.DB.First(&progress, progressID)

	if progress.ID == 0 {
		return c.JSON(http.StatusNotFound, "Progress not found")
	}

	if err := c.Bind(&progress); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	s.DB.Save(&progress)

	return c.JSON(http.StatusOK, progress)
}

func (s *SubTaskProgressController) DeleteSubTaskProgress(c echo.Context) error {
	var progress model.SubTaskProgress
	progressID := c.Param("id")

	s.DB.First(&progress, progressID)

	if progress.ID == 0 {
		return c.JSON(http.StatusNotFound, "Progress not found")
	}

	s.DB.Delete(&progress)

	return c.JSON(http.StatusOK, "Progress deleted")
}
