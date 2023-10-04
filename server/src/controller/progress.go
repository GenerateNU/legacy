package controller

import (
	"net/http"
	"server/src/model"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type ProgressController struct {
	DB *gorm.DB
}

func (p *ProgressController) GetAllProgress(c echo.Context) error {
	var progress []model.Progress

	p.DB.Find(&progress)
	return c.JSON(http.StatusOK, progress)
}

func (p *ProgressController) GetProgress(c echo.Context) error {
	var progress model.Progress
	progressID := c.Param("id")

	p.DB.First(&progress, progressID)

	if progress.ID == 0 {
		return c.JSON(http.StatusNotFound, "Progress not found")
	}

	return c.JSON(http.StatusOK, progress)
}

func (p *ProgressController) CreateProgress(c echo.Context) error {
	var progress model.Progress

	if err := c.Bind(&progress); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	validator := validator.New()

	if err := validator.Struct(progress); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	p.DB.Create(&progress)

	return c.JSON(http.StatusCreated, progress)
}

func (p *ProgressController) UpdateProgress(c echo.Context) error {
	var progress model.Progress
	progressID := c.Param("id")

	p.DB.First(&progress, progressID)

	if progress.ID == 0 {
		return c.JSON(http.StatusNotFound, "Progress not found")
	}

	if err := c.Bind(&progress); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	p.DB.Save(&progress)

	return c.JSON(http.StatusOK, progress)
}

func (p *ProgressController) DeleteProgress(c echo.Context) error {
	var progress model.Progress
	progressID := c.Param("id")

	p.DB.First(&progress, progressID)

	if progress.ID == 0 {
		return c.JSON(http.StatusNotFound, "Progress not found")
	}

	p.DB.Delete(&progress)

	return c.JSON(http.StatusOK, "Progress deleted")
}
