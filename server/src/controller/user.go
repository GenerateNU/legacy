package controller

import (
	"fmt"
	"net/http"
	"server/src/model"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type UserController struct {
	DB *gorm.DB
}

func (u *UserController) GetAllUsers(c echo.Context) error {
	var users []model.User

	u.DB.Find(&users)
	return c.JSON(http.StatusOK, users)
}

func (u *UserController) GetUser(c echo.Context) error {
	var user model.User
	userID := c.Param("id")

	u.DB.First(&user, userID)

	if user.ID == 0 {
		return c.JSON(http.StatusNotFound, "User not found")
	}

	return c.JSON(http.StatusOK, user)
}

func (u *UserController) GetUserPersona(c echo.Context) error {
	var user model.User
	var persona model.Persona
	userID := c.Param("id")

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
	// User -> Persona -> Tasks
	var user model.User
	var persona model.Persona
	var tasks []model.Task

	userID := c.Param("id")

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

	return c.JSON(http.StatusOK, tasks)
}

func (u *UserController) CreateUser(c echo.Context) error {
	var user model.User

	fmt.Println("Creating user", user)

	// Bind the data sent in the POST request to the user model
	// Handle the error if there is one
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// Like Zod https://zod.dev/
	// https://pkg.go.dev/github.com/go-playground/validator/v10
	validator := validator.New()

	// Checks if the binded data is valid according to the rules defined in the model
	if err := validator.Struct(user); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	u.DB.Create(&user)

	return c.JSON(http.StatusCreated, user)
}

func (u *UserController) UpdateUser(c echo.Context) error {
	var user model.User
	userID := c.Param("id")

	// Finds the user with the given ID
	u.DB.First(&user, userID)

	// If the user is not found
	if user.ID == 0 {
		return c.JSON(http.StatusNotFound, "User not found")
	}

	// Binds the data sent in the PUT request to the user model
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	u.DB.Save(&user)

	return c.JSON(http.StatusOK, user)
}

func (u *UserController) DeleteUser(c echo.Context) error {
	var user model.User
	userID := c.Param("id")

	u.DB.First(&user, userID)

	if user.ID == 0 {
		return c.JSON(http.StatusNotFound, "User not found")
	}

	u.DB.Delete(&user)

	return c.JSON(http.StatusOK, "User deleted")
}
