package controller

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func SetupControllers(e *echo.Echo, db *gorm.DB) {
	// Create a new instance of the controller with the database connection
	userController := UserController{db}

	// Define your routes and associate them with controller functions
	e.GET("v1/api/users", userController.GetAllUsers)
	e.GET("v1/api/users/:id", userController.GetUser)
}
