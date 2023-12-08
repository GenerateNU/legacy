package controllers

import (
	"net/http"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

type ProgressController struct {
	progressService services.ProgressServiceInterface
}

func NewProgressController(progressService services.ProgressServiceInterface) *ProgressController {
	return &ProgressController{progressService: progressService}
}

func (p *ProgressController) GetTaskProgress(c echo.Context) error {
	userID := c.Param("uid")
	taskID := c.Param("tid")
	taskProgress, err := p.progressService.GetTaskProgress(userID, taskID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "failed to fetch task progress")
	}

	return c.JSON(http.StatusOK, taskProgress)
}

func (p *ProgressController) GetSubTaskProgress(c echo.Context) error {
	userID := c.Param("uid")
	subTaskID := c.Param("sid")
	subTaskProgress, err := p.progressService.GetSubTaskProgress(userID, subTaskID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "failed to fetch subtask progress")
	}

	return c.JSON(http.StatusOK, subTaskProgress)
}

func (p *ProgressController) CompleteTaskProgress(c echo.Context) error {
	userID := c.Param("uid")
	taskID := c.Param("tid")
	taskProgress, err := p.progressService.CompleteTaskProgress(userID, taskID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "failed to complete task progress")
	}

	return c.JSON(http.StatusOK, taskProgress)
}

func (p *ProgressController) CompleteSubTaskProgress(c echo.Context) error {
	userID := c.Param("uid")
	subTaskID := c.Param("sid")
	subTaskProgress, err := p.progressService.CompleteSubTaskProgress(userID, subTaskID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "failed to complete subtask progress")
	}

	return c.JSON(http.StatusOK, subTaskProgress)
}

func (p *ProgressController) GetAllSubTaskProgressOfTask(c echo.Context) error {
	userID := c.Param("uid")
	taskID := c.Param("tid")
	subTaskProgress, err := p.progressService.GetAllSubTaskProgressOfTask(userID, taskID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "failed to fetch all subtask progresses of task")
	}

	return c.JSON(http.StatusOK, subTaskProgress)
}
