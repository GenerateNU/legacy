package controller

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func SetupControllers(e *echo.Echo, db *gorm.DB) {
	// Create a new instance of the controller with the database connection
	userController := UserController{db}

	// Define your routes and associate them with controller functions
	e.GET("api/users", userController.GetAllUsers)
	e.GET("api/users/:id", userController.GetUser)
	e.POST("api/users", userController.CreateUser)
	e.PUT("api/users/:id", userController.UpdateUser)
	e.DELETE("api/users/:id", userController.DeleteUser)

}
