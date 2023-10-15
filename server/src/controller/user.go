package controller

import (
	"net/http"
	"server/src/model"
	"time"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type UserController struct {
	DB *gorm.DB
}

func (u *UserController) GetAllUsers(c echo.Context) error {
	var users []model.User

	u.DB.Omit("password").Find(&users)

	return c.JSON(http.StatusOK, users)
}

func (u *UserController) GetUser(c echo.Context) error {
	var user model.User

	userID := c.Param("uid")

	u.DB.Omit("password").First(&user, userID)

	if user.ID == 0 {
		return handleError(c, http.StatusNotFound, "User not found")
	}

	return c.JSON(http.StatusOK, user)
}

func (u *UserController) GetUserPersona(c echo.Context) error {
	var user model.User
	var persona model.Persona

	userID := c.Param("uid")

	err := u.DB.First(&user, userID).Error
	if err != nil {
		return c.JSON(http.StatusNotFound, "User not found")
	}

	u.DB.Model(&user).Association("Persona").Find(&persona)
	if persona.ID == 0 {
		return c.JSON(http.StatusNotFound, "User does not have a persona")
	}

	return c.JSON(http.StatusOK, persona)
}

func (u *UserController) GetUserTasks(c echo.Context) error {
	var user model.User
	var persona model.Persona
	var taskProgress []model.TaskProgress
	var tasks []model.Task

	userID := c.Param("id")
	completedParam := c.QueryParam("completed") // Extract completed path parameter

	err := u.DB.First(&user, userID).Error
	if err != nil {
		return c.JSON(http.StatusNotFound, "User not found")
	}

	u.DB.Model(&user).Association("Persona").Find(&persona)
	if persona.ID == 0 {
		return c.JSON(http.StatusNotFound, "User does not have a persona")
	}

	// Fetch task progress based on completion status
	switch completedParam {
	case "true":
		u.DB.Where("user_id = ? AND completed = ?", user.ID, true).Find(&taskProgress)
	case "false":
		u.DB.Where("user_id = ? AND completed = ?", user.ID, false).Find(&taskProgress)
	default:
		u.DB.Where("user_id = ?", user.ID).Find(&taskProgress) // Fetch all task progress
	}

	// Converts filtered task progress to tasks
	for _, progress := range taskProgress {
		tasks = append(tasks, progress.Task)
	}

	if len(tasks) == 0 {
		return c.JSON(http.StatusNotFound, "Persona does not have any tasks")
	}

	return c.JSON(http.StatusOK, tasks)
}

func (u *UserController) GetUserSubtasks(c echo.Context) error {
	var user model.User
	var persona model.Persona
	var tasks []model.Task
	var subtasks []model.SubTask

	userID := c.Param("uid")

	err := u.DB.First(&user, userID).Error
	if err != nil {
		return c.JSON(http.StatusNotFound, "User not found")
	}

	u.DB.Model(&user).Association("Persona").Find(&persona)
	if persona.ID == 0 {
		return c.JSON(http.StatusNotFound, "User does not have a persona")
	}

	u.DB.Model(&persona).Association("Tasks").Find(&tasks)
	if len(tasks) == 0 {
		return c.JSON(http.StatusNotFound, "Persona does not have any tasks")
	}

	u.DB.Model(&tasks).Association("Subtasks").Find(&subtasks)
	if len(subtasks) == 0 {
		return c.JSON(http.StatusNotFound, "Persona does not have any subtasks")
	}

	return c.JSON(http.StatusOK, subtasks)
}

func (u *UserController) GetUserProfile(c echo.Context) error {
	var user model.User
	var userprofile model.UserProfile

	userID := c.Param("uid")

	err := u.DB.First(&user, userID).Error
	if err != nil {
		return c.JSON(http.StatusNotFound, "User not found")
	}

	u.DB.First(&userprofile, userID)
	if userprofile.ID == 0 {
		return c.JSON(http.StatusNotFound, "User does not have a profile")
	}

	return c.JSON(http.StatusOK, userprofile)
}

func (u *UserController) CreateUser(c echo.Context) error {
	var user model.User

	if err := validateData(c, &user); err != nil {
		return err
	}

	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()

	result := u.DB.Create(&user)
	if result.Error != nil {
		return handleError(c, http.StatusBadRequest, result.Error.Error())
	}

	return c.JSON(http.StatusCreated, user)
}

func (u *UserController) UpdateUser(c echo.Context) error {
	var user model.User

	userID := c.Param("uid")

	u.DB.First(&user, userID)
	if user.ID == 0 {
		return c.JSON(http.StatusNotFound, "User not found")
	}

	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	u.DB.Save(&user)

	user.Password = ""

	return c.JSON(http.StatusOK, user)
}

func (u *UserController) DeleteUser(c echo.Context) error {
	var user model.User
	userID := c.Param("uid")

	u.DB.First(&user, userID)

	if user.ID == 0 {
		return c.JSON(http.StatusNotFound, "User not found")
	}

	u.DB.Delete(&user)

	return c.JSON(http.StatusOK, "User deleted")
}
