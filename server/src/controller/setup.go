package controller

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func SetupControllers(e *echo.Echo, db *gorm.DB) {
	// Create a new instance of the controller with the database connection
	userController := UserController{db}
	personaController := PersonaController{db}
	userProfileController := UserProfileController{db}
	taskController := TaskController{db}
	subtaskController := SubtaskController{db}
	progressController := ProgressController{db}

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

	// User Profile routes
	e.GET("api/profile", userProfileController.GetAllUserProfiles)
	e.GET("api/profile/:id", userProfileController.GetUserProfile)
	e.POST("api/profile", userProfileController.CreateUserProfile)
	e.PUT("api/profile/:id", userProfileController.UpdateUserProfile)
	e.DELETE("api/profile/:id", userProfileController.DeleteUserProfile)

	// Task routes
	e.GET("api/task", taskController.GetAllTasks)
	e.GET("api/task/:id", taskController.GetTask)
	e.POST("api/task", taskController.CreateTask)
	e.PUT("api/task/:id", taskController.UpdateTask)
	e.DELETE("api/task/:id", taskController.DeleteTask)

	// Task routes
	e.GET("api/subtask", subtaskController.GetAllSubtasks)
	e.GET("api/subtask/:id", subtaskController.GetAllSubtasks)
	e.POST("api/subtask", subtaskController.CreateSubtask)
	e.PUT("api/subtask/:id", subtaskController.UpdateSubtask)
	e.DELETE("api/subtask/:id", subtaskController.DeleteSubtask)

	// Progress routes
	e.GET("api/progress", progressController.GetAllProgress)
	e.GET("api/progress/:id", progressController.GetProgress)
	e.POST("api/progress", progressController.CreateProgress)
	e.PUT("api/progress/:id", progressController.UpdateProgress)
	e.DELETE("api/progress/:id", progressController.DeleteProgress)

	// AWS
	e.GET("v1/api/aws", awsController.dump)

}
