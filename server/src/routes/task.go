package routes

import (
	"server/src/controllers"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

func TaskRoutes(g *echo.Group, taskService services.TaskServiceInterface) {
	taskController := controllers.NewTaskController(taskService)

	g.GET("/", taskController.GetAllTasks)
	g.GET("/:tid", taskController.GetTasks)
	g.GET("/:tid/subtasks", taskController.GetAllSubtasksOfTask)
	g.POST("/", taskController.CreateTask)
	g.PUT("/:tid", taskController.UpdateTask)
	g.DELETE("/:tid", taskController.DeleteTask)
}
