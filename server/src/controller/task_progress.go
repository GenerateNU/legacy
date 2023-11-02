package controller

import (
	"net/http"
	"server/src/model"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type TaskProgressController struct {
	DB *gorm.DB
}

func (t *TaskProgressController) GetAllTaskProgress(c echo.Context) error {
	var progress []model.TaskProgress

	t.DB.Find(&progress)
	return c.JSON(http.StatusOK, progress)
}

func (t *TaskProgressController) GetTaskProgress(c echo.Context) error {
	var progress model.TaskProgress
	progressID := c.Param("id")

	t.DB.First(&progress, progressID)

	if progress.ID == 0 {
		return c.JSON(http.StatusNotFound, "Progress not found")
	}

	return c.JSON(http.StatusOK, progress)
}

func (t *TaskProgressController) CreateTaskProgress(c echo.Context) error {
	var progress model.TaskProgress

	if err := c.Bind(&progress); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	validator := validator.New()

	if err := validator.Struct(progress); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	t.DB.Create(&progress)

	return c.JSON(http.StatusCreated, progress)
}

func (t *TaskProgressController) UpdateTaskProgress(c echo.Context) error {
	var progress model.TaskProgress
	progressID := c.Param("id")

	t.DB.First(&progress, progressID)

	if progress.ID == 0 {
		return c.JSON(http.StatusNotFound, "Progress not found")
	}

	if err := c.Bind(&progress); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	t.DB.Save(&progress)

	return c.JSON(http.StatusOK, progress)
}

func (t *TaskProgressController) DeleteTaskProgress(c echo.Context) error {
	var progress model.TaskProgress
	progressID := c.Param("id")

	t.DB.First(&progress, progressID)

	if progress.ID == 0 {
		return c.JSON(http.StatusNotFound, "Progress not found")
	}

	t.DB.Delete(&progress)

	return c.JSON(http.StatusOK, "Progress deleted")
}
