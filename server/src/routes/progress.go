package routes

import (
	"server/src/controllers"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

func ProgressRoutes(g *echo.Group, progressService services.ProgressServiceInterface) {
	progressController := controllers.NewProgressController(progressService)

	g.GET("/task/:uid/:tid", progressController.GetTaskProgress)
	g.GET("/subtask/:uid/:sid", progressController.GetSubTaskProgress)
	g.GET("/:uid/:tid", progressController.GetAllSubTaskProgressOfTask)
	g.POST("/task/:uid/:tid", progressController.CompleteTaskProgress)
	g.POST("/subtask/:uid/:sid", progressController.CompleteSubTaskProgress)

}
