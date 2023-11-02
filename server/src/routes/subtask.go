package routes

import (
	"server/src/controllers"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

func SubTaskRoutes(g *echo.Group, subTaskService services.SubTaskServiceInterface) {
	subtaskController := controllers.NewSubTaskController(subTaskService)

	g.GET("/", subtaskController.GetAllSubTasks)
	g.GET("/:sid", subtaskController.GetSubTasks)
	g.POST("/", subtaskController.CreateSubTask)
	g.PATCH("/:sid", subtaskController.UpdateSubTask)
	g.DELETE("/:sid", subtaskController.DeleteSubTask)
}
