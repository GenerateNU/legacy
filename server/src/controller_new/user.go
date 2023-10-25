package controller_new

import (
	"net/http"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

type UserController struct {
	userService *services.UserService
}

func NewUserController(userService services.UserService) *UserController {
	return &UserController{&userService}
}

func (u *UserController) GetAllUsers(c echo.Context) error {
	users, err := u.userService.GetAllUsers(c)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch users")
	}

	return c.JSON(http.StatusOK, users)
}

func (u *UserController) GetUser(c echo.Context) error {
	user, err := u.userService.GetUser(c)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch user")
	}

	return c.JSON(http.StatusOK, user)
}

func (u *UserController) CreateUser(c echo.Context) error {
	user, err := u.userService.CreateUser(c)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to create user")
	}

	return c.JSON(http.StatusCreated, user)
}

func (u *UserController) UpdateUser(c echo.Context) error {
	user, err := u.userService.UpdateUser(c)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to update user")
	}

	return c.JSON(http.StatusOK, user)
}

func (u *UserController) DeleteUser(c echo.Context) error {
	err := u.userService.DeleteUser(c)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to update user")
	}

	return c.JSON(http.StatusOK, "User deleted")
}
