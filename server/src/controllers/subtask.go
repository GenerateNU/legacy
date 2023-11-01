package controllers

import (
	"net/http"
	"server/src/models"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

type SubTaskController struct {
	subTaskService services.SubTaskServiceInterface
}

func NewSubTaskController(subTaskService services.SubTaskServiceInterface) *SubTaskController {
	return &SubTaskController{subTaskService: subTaskService}
}

func (t *SubTaskController) GetAllSubTasks(c echo.Context) error {
	subtasks, err := t.subTaskService.GetAllSubTasks()
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch subtasks")
	}

	return c.JSON(http.StatusOK, subtasks)
}

func (t *SubTaskController) GetSubTasks(c echo.Context) error {
	subTaskID := c.Param("sid")
	subTask, err := t.subTaskService.GetSubTask(subTaskID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch subtask")
	}

	return c.JSON(http.StatusOK, subTask)
}

func (t *SubTaskController) CreateSubTask(c echo.Context) error {
	var subTask models.SubTask

	if err := c.Bind(&subTask); err != nil {
		return err
	}

	if err := services.ValidateData(c, subTask); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to validate the data"+err.Error())
	}

	createdTask, err := t.subTaskService.CreateSubTask(subTask)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to create the subtask")
	}

	return c.JSON(http.StatusOK, createdTask)
}

func (t *SubTaskController) UpdateSubTask(c echo.Context) error {
	var subTask models.SubTask

	if err := c.Bind(&subTask); err != nil {
		return c.JSON(http.StatusNotFound, "Failed to bind subtask")
	}

	subTaskID := c.Param("sid")
	subTask, err := t.subTaskService.UpdateSubTask(subTaskID, subTask)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to update subtask")
	}

	return c.JSON(http.StatusOK, subTask)
}

func (t *SubTaskController) DeleteSubTask(c echo.Context) error {
	subTaskID := c.Param("sid")
	err := t.subTaskService.DeleteSubTask(subTaskID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to delete subtask")
	}

	return c.JSON(http.StatusOK, "Subtask successfully deleted")
}
