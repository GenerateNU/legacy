package controller

import (
	"net/http"
	"server/src/model"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type TaskController struct {
	DB *gorm.DB
}

func (t *TaskController) GetAllTasks(c echo.Context) error {
	var task []model.User

	t.DB.Find(&task)
	return c.JSON(http.StatusOK, task)
}

func (t *TaskController) GetTask(c echo.Context) error {
	var task model.Task
	taskID := c.Param("id")

	t.DB.First(&task, taskID)

	if task.ID == 0 {
		return c.JSON(http.StatusNotFound, "Task not found")
	}

	return c.JSON(http.StatusOK, task)
}
