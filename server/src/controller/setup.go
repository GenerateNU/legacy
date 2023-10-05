package controller

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func SetupControllers(e *echo.Echo, db *gorm.DB) {
	// Create a new instance of the controller with the database connection
	userController := UserController{db}
	personaController := PersonaController{db}
	awsController := AwsController{db}

	// User routes
	e.GET("api/users", userController.GetAllUsers)
	e.GET("api/users/:id", userController.GetUser)
	e.POST("api/users", userController.CreateUser)
	e.PUT("api/users/:id", userController.UpdateUser)
	e.DELETE("api/users/:id", userController.DeleteUser)

	// Persona routes
	e.GET("api/personas", personaController.GetAllPersonas)
	e.GET("api/personas/:id", personaController.GetPersona)
	e.POST("api/personas", personaController.CreatePersona)
	e.PUT("api/personas/:id", personaController.UpdatePersona)
	e.DELETE("api/personas/:id", personaController.DeletePersona)

	// AWS
	e.GET("v1/api/aws", awsController.dump)
	e.GET("v1/api/aws/:file-key", awsController.GetFile)
	e.POST("v1/api/aws", awsController.CreateFile)

}
