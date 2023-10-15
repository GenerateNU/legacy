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
	e.GET("api/users/:id", userController.GetUser)
	e.GET("api/users/:id/persona", userController.GetUserPersona)
	e.GET("api/users/:id/tasks", userController.GetUserTasks)
	e.GET("api/users/:id/subtasks", userController.GetUserSubtasks)
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

	// SubTask routes
	e.GET("api/subtask", subtaskController.GetAllSubtasks)
	e.GET("api/subtask/:id", subtaskController.GetAllSubtasks)
	e.POST("api/subtask", subtaskController.CreateSubtask)
	e.PUT("api/subtask/:id", subtaskController.UpdateSubtask)
	e.DELETE("api/subtask/:id", subtaskController.DeleteSubtask)

	// Task Progress routes
	e.GET("api/progress", taskprogressController.GetAllTaskProgress)
	e.GET("api/progress/:id", taskprogressController.GetTaskProgress)
	e.POST("api/progress", taskprogressController.CreateTaskProgress)
	e.PUT("api/progress/:id", taskprogressController.UpdateTaskProgress)
	e.DELETE("api/progress/:id", taskprogressController.DeleteTaskProgress)

	// Subtask Progress routes
	e.GET("api/subprogress", subtaskprogressController.GetAllSubTaskProgress)
	e.GET("api/subprogress/:id", subtaskprogressController.GetSubTaskProgress)
	e.POST("api/subprogress", subtaskprogressController.CreateSubTaskProgress)
	e.PUT("api/subprogress/:id", subtaskprogressController.UpdateSubTaskProgress)
	e.DELETE("api/subprogress/:id", subtaskprogressController.DeleteSubTaskProgress)

	// TODO: Add nonCRUD routes for the following:
	// - Get a user's persona. (done)
	// - Add tasks to a persona.
	//  (This is a many-to-many relationship so this includes adding a relationship between a persona and a task in the persona_tasks table.)
	// - Get personas associated with tasks or subtasks.
	// - Get all subtasks for a user, (done) optionally filtered by completion status. (not complete)
	// - Get all tasks for a user, (done) optionally filtered by completion status. (not complete)
	// - Get x amount of tasks for a user, optionally filtered by completion status.

	// - Get all files (file names and tags and id getting the actual file is seperate) for a user.
	// - Auth-related routes (login, logout).

	// AWS
	e.GET("v1/api/aws", awsController.dump)
	e.GET("v1/api/aws/:file-key", awsController.GetFile)
	e.POST("v1/api/aws", awsController.CreateFile)
}
