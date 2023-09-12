package controller

import (
	"net/http"
	"server/src/model"

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
