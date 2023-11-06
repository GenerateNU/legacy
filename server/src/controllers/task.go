package controllers

import (
	"net/http"
	"server/src/models"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

type TaskController struct {
	taskService services.TaskServiceInterface
}

func NewTaskController(taskService services.TaskServiceInterface) *TaskController {
	return &TaskController{taskService: taskService}
}

func (t *TaskController) GetTasks(c echo.Context) error {
	taskID := c.Param("tid")
	task, err := t.taskService.GetTask(taskID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch task")
	}

	return c.JSON(http.StatusOK, task)
}

func (t *TaskController) GetAllTasks(c echo.Context) error {
	var tasks []models.Task

	tasks, err := t.taskService.GetAllTasks()
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch tasks")
	}

	return c.JSON(http.StatusOK, tasks)
}

func (t *TaskController) GetAllSubTasksOfTask(c echo.Context) error {
	taskID := c.Param("tid")
	subtasks, err := t.taskService.GetAllSubTasksOfTask(taskID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch subtasks")
	}

	return c.JSON(http.StatusOK, subtasks)
}

func (t *TaskController) CreateTask(c echo.Context) error {
	var task models.Task

	if err := c.Bind(&task); err != nil {
		return err
	}

	if err := services.ValidateData(c, task); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to validate the data"+err.Error())
	}

	createdTask, err := t.taskService.CreateTask(task)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to create the task")
	}

	return c.JSON(http.StatusOK, createdTask)
}

func (t *TaskController) UpdateTask(c echo.Context) error {
	var task models.Task

	if err := c.Bind(&task); err != nil {
		return c.JSON(http.StatusNotFound, "Failed to bind task")
	}

	taskID := c.Param("tid")
	task, err := t.taskService.UpdateTask(taskID, task)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to update task")
	}

	return c.JSON(http.StatusOK, task)
}

func (t *TaskController) DeleteTask(c echo.Context) error {
	taskID := c.Param("tid")
	err := t.taskService.DeleteTask(taskID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to delete task")
	}

	return c.JSON(http.StatusOK, "Task successfully deleted")
}
