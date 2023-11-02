package controller

import (
	"net/http"
	"server/src/model"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type SubtaskController struct {
	DB *gorm.DB
}

func (s *SubtaskController) GetAllSubtasks(c echo.Context) error {
	var subtasks []model.SubTask

	s.DB.Find(&subtasks)
	return c.JSON(http.StatusOK, subtasks)
}

func (s *SubtaskController) GetSubtask(c echo.Context) error {
	var subtask model.SubTask
	subtaskID := c.Param("id")

	s.DB.First(&subtask, subtaskID)

	if subtask.ID == 0 {
		return c.JSON(http.StatusNotFound, "Subtask not found")
	}

	return c.JSON(http.StatusOK, subtask)
}

func (s *SubtaskController) CreateSubtask(c echo.Context) error {
	var subtask model.SubTask

	if err := c.Bind(&subtask); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	validator := validator.New()

	if err := validator.Struct(subtask); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	s.DB.Create(&subtask)

	return c.JSON(http.StatusCreated, subtask)
}

func (s *SubtaskController) UpdateSubtask(c echo.Context) error {
	var subtask model.SubTask
	subtaskID := c.Param("id")

	s.DB.First(&subtask, subtaskID)

	if subtask.ID == 0 {
		return c.JSON(http.StatusNotFound, "Subtask not found")
	}

	if err := c.Bind(&subtask); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	s.DB.Save(&subtask)

	return c.JSON(http.StatusOK, subtask)
}

func (s *SubtaskController) DeleteSubtask(c echo.Context) error {
	var subtask model.SubTask
	subtaskID := c.Param("id")

	s.DB.First(&subtask, subtaskID)

	if subtask.ID == 0 {
		return c.JSON(http.StatusNotFound, "Subtask not found")
	}

	s.DB.Delete(&subtask)

	return c.JSON(http.StatusOK, "Subtask deleted")
}
