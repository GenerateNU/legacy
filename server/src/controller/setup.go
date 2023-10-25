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
	taskprogressController := TaskProgressController{db}
	subtaskprogressController := SubTaskProgressController{db}

	awsController := AwsController{db}

	// User routes
	e.GET("api/users", userController.GetAllUsers)
	e.GET("api/users/:uid", userController.GetUser)
	e.GET("api/users/username/:username", userController.GetUserFromUsername)
	e.GET("api/users/firebase/:firebaseid", userController.GetUserFromFirebaseID)

	// Once user gets created call this functon X
	// e.POST("api/progress/:uid", taskprogressController.CreateAllTaskProgress)
	// User has 4 tasks -> (User 1, Task 1), (User 1, Task 2), (User 1, Task 3), (User 1, Task 4)
	// e.POST("api/subprogress/:uid", subtaskprogressController.CreateAllSubTaskProgress)

	e.GET("api/users/:uid/persona", userController.GetUserPersona)
	e.GET("api/users/:uid/tasks", userController.GetUserTasks)
	e.GET("api/users/:uid/profile", userController.GetUserProfile)

	e.POST("api/users", userController.CreateUser)
	e.PUT("api/users/:uid", userController.UpdateUser)
	e.DELETE("api/users/:uid", userController.DeleteUser)

	// Persona routes
	e.GET("api/personas", personaController.GetAllPersonas)
	e.GET("api/personas/:pid", personaController.GetPersona)

	// Get a persona tasks
	e.GET("api/personas/:pid/tasks", personaController.GetPersonaTasks)

	e.POST("api/personas/", personaController.CreatePersona)
	e.PUT("api/personas/:pid", personaController.UpdatePersona)
	e.DELETE("api/personas/:pid", personaController.DeletePersona)
	e.PUT("api/personas/:pid/tasks", personaController.AddTasksToPersona)

	// User Profile routes
	e.GET("api/profiles/:upid", userProfileController.GetUserProfile)
	e.POST("api/profiles/:uid/", userProfileController.CreateUserProfile) // Creates a user profile for the given user
	e.PUT("api/profiles/:upid", userProfileController.UpdateUserProfile)
	e.PUT("api/profiles/response/:uid", userProfileController.CreateOnboardingResponse)
	e.DELETE("api/profiles/:upid", userProfileController.DeleteUserProfile)

	// Task routes
	e.GET("api/tasks", taskController.GetAllTasks)
	e.GET("api/tasks/:tid", taskController.GetTask)
	e.POST("api/tasks", taskController.CreateTask)
	e.PUT("api/tasks/:tid", taskController.UpdateTask)
	e.DELETE("api/tasks/:tid", taskController.DeleteTask)
	e.GET("api/tasks/:tid/subtasks", taskController.GetSubtasksFromTask)

	// SubTask routes
	e.GET("api/subtasks", subtaskController.GetAllSubtasks)
	e.GET("api/subtasks/:id", subtaskController.GetAllSubtasks)
	e.POST("api/subtasks", subtaskController.CreateSubtask)
	e.PUT("api/subtasks/:id", subtaskController.UpdateSubtask)
	e.DELETE("api/subtasks/:id", subtaskController.DeleteSubtask)

	// Task Progress routes
	e.GET("api/progress", taskprogressController.GetAllTaskProgress)
	e.GET("api/progress/:id", taskprogressController.GetTaskProgress)

	e.PUT("api/progress/:id", taskprogressController.UpdateTaskProgress)
	e.DELETE("api/progress/:id", taskprogressController.DeleteTaskProgress)

	// Subtask Progress routes
	e.GET("api/subprogress", subtaskprogressController.GetAllSubTaskProgress)
	e.GET("api/subprogress/:id", subtaskprogressController.GetSubTaskProgress)
	e.PUT("api/subprogress/:id", subtaskprogressController.UpdateSubTaskProgress)
	e.DELETE("api/subprogress/:id", subtaskprogressController.DeleteSubTaskProgress)

	// - Get all files (file names and tags and id getting the actual file is seperate) for a user.
	// - Auth-related routes (login, logout).

	// AWS
	e.GET("/api/aws/:fid", awsController.GetFile)
	e.POST("/api/aws", awsController.CreateFile)
	e.DELETE("/api/aws/:fid", awsController.DeleteFile)
	e.GET("/api/aws/:fid/:days", awsController.GetPresignedURL)
	e.GET("/api/aws/user/:uid", awsController.GetAllFiles)
}
