package routes

import (
	"server/src/controllers"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

func FileRoutes(g *echo.Group, fileService services.FileServiceInterface) {
	fileController := controllers.NewFileController(fileService)

	g.GET("/", fileController.GetAllFiles)
	g.GET("/:fid/filename", fileController.GetFilename)
	g.GET("/:uid/user", fileController.GetAllUserFiles)
	g.GET("/:fid?days=:days", fileController.GetFileURL) // to GetFileURL
	g.POST("/:uid", fileController.CreateFile)
	g.POST("/makepdf/:uid", fileController.GeneratePDF)
	g.DELETE("/:fid", fileController.DeleteFile)
}
