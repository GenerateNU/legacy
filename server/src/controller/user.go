package controller

import (
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

func (u *UserController) CreateUser(c echo.Context) error {
	var user model.User

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
