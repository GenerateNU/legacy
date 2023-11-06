package routes

import (
	"server/src/controllers"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

func FileRoutes(g *echo.Group, fileService services.FileServiceInterface) {
	fileController := controllers.NewFileController(fileService)

	g.GET("/", fileController.GetAllFiles)
	g.GET("/:fid?days=:days", fileController.GetPresignedURL)
	g.GET("/:uid/user", fileController.GetAllUserFiles)
	g.POST("/:uid", fileController.CreateFile)
	g.DELETE("/:fid", fileController.DeleteFile)
}
