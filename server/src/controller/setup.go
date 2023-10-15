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

	// Get a user from username
	// e.GET("api/users?username=", userController.GetUserFromUsername)

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
	// Add tasks to a persona.
	e.PUT("api/personas/:pid/tasks", personaController.AddTasksToPersona)

	// User Profile routes
	e.GET("api/profiles/:upid", userProfileController.GetUserProfile)
	e.POST("api/profiles/:uid/", userProfileController.CreateUserProfile)
	e.PUT("api/profiles/:upid", userProfileController.UpdateUserProfile)
	e.DELETE("api/profiles/:upid", userProfileController.DeleteUserProfile)

	// Task routes
	e.GET("api/tasks", taskController.GetAllTasks)
	e.GET("api/tasks/:id", taskController.GetTask)
	e.POST("api/tasks", taskController.CreateTask)
	e.PUT("api/tasks/:id", taskController.UpdateTask)
	e.DELETE("api/tasks/:id", taskController.DeleteTask)

	// SubTask routes
	e.GET("api/subtasks", subtaskController.GetAllSubtasks)
	e.GET("api/subtasks/:id", subtaskController.GetAllSubtasks)
	e.POST("api/subtasks", subtaskController.CreateSubtask)
	e.PUT("api/subtasks/:id", subtaskController.UpdateSubtask)
	e.DELETE("api/subtasks/:id", subtaskController.DeleteSubtask)

	// Task Progress routes
	e.GET("api/progress", taskprogressController.GetAllTaskProgress)
	e.GET("api/progress/:id", taskprogressController.GetTaskProgress)
	// e.POST("api/progress", taskprogressController.CreateTaskProgress)
	e.PUT("api/progress/:id", taskprogressController.UpdateTaskProgress)
	e.DELETE("api/progress/:id", taskprogressController.DeleteTaskProgress)

	// Subtask Progress routes
	e.GET("api/subprogress", subtaskprogressController.GetAllSubTaskProgress)
	e.GET("api/subprogress/:id", subtaskprogressController.GetSubTaskProgress)
	// e.POST("api/subprogress", subtaskprogressController.CreateSubTaskProgress)
	e.PUT("api/subprogress/:id", subtaskprogressController.UpdateSubTaskProgress)
	e.DELETE("api/subprogress/:id", subtaskprogressController.DeleteSubTaskProgress)

	// TODO: Add nonCRUD routes for the following:
<<<<<<< Updated upstream
	// - Update (Create associated task progress/subtask progress for a task/subtask)
	// - Get personas associated with tasks
=======
	// - Get a user's persona. (done)
	// - Get personas associated with tasks.
	// - Get all subtasks for a user, optionally filtered by completion status.
	// - Get all tasks for a user, (done) optionally filtered by completion status. (not complete)
	// - Get x amount of tasks for a user, optionally filtered by completion status.
>>>>>>> Stashed changes

	// - Get all files (file names and tags and id getting the actual file is seperate) for a user.
	// - Auth-related routes (login, logout).

	// AWS
	e.GET("v1/api/aws", awsController.dump)
	e.GET("v1/api/aws/:file-key", awsController.GetFile)
	e.POST("v1/api/aws", awsController.CreateFile)
}
