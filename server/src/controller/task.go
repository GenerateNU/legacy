package controller

import (
	"net/http"
	"server/src/model"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type TaskController struct {
	DB *gorm.DB
}

func (t *TaskController) GetAllTasks(c echo.Context) error {
	var task []model.Task

	t.DB.Find(&task)
	return c.JSON(http.StatusOK, task)
}

func (t *TaskController) GetTask(c echo.Context) error {
	var task model.Task
	taskID := c.Param("tid")

	t.DB.First(&task, taskID)

	if task.ID == 0 {
		return c.JSON(http.StatusNotFound, "Task not found")
	}

	return c.JSON(http.StatusOK, task)
}

func (t *TaskController) CreateTask(c echo.Context) error {
	var task model.Task

	if err := c.Bind(&task); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	validator := validator.New()

	if err := validator.Struct(task); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	t.DB.Create(&task)

	return c.JSON(http.StatusCreated, task)
}

func (t *TaskController) UpdateTask(c echo.Context) error {
	var task model.Task
	taskID := c.Param("tid")

	t.DB.First(&task, taskID)

	if task.ID == 0 {
		return c.JSON(http.StatusNotFound, "Task not found")
	}

	if err := c.Bind(&task); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	t.DB.Save(&task)

	return c.JSON(http.StatusOK, task)
}

func (t *TaskController) DeleteTask(c echo.Context) error {
	var task model.Task
	taskID := c.Param("tid")

	t.DB.First(&task, taskID)

	if task.ID == 0 {
		return c.JSON(http.StatusNotFound, "Task not found")
	}

	t.DB.Delete(&task)

	return c.JSON(http.StatusOK, "Task deleted")
}

func (t *TaskController) GetSubtasksFromTask(c echo.Context) error {
	taskID := c.Param("tid")

	// Retrieve the subtasks related to the task by ID
	var subtasks []model.SubTask
	if err := t.DB.Where("task_id = ?", taskID).Find(&subtasks).Error; err != nil {
		return c.JSON(http.StatusNotFound, "Subtasks not found")
	}

	return c.JSON(http.StatusOK, subtasks)
}
