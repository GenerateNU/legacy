package controller

import (
	"net/http"
	"server/src/model"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type UserProfileController struct {
	DB *gorm.DB
}

func (up *UserProfileController) GetAllUserProfiles(c echo.Context) error {
	var userprofiles []model.UserProfile

	up.DB.Find(&userprofiles)
	return c.JSON(http.StatusOK, userprofiles)
}

func (up *UserProfileController) GetUserProfile(c echo.Context) error {
	var userprofile model.UserProfile
	userprofileID := c.Param("id")

	up.DB.First(&userprofile, userprofileID)

	if userprofile.ID == 0 {
		return c.JSON(http.StatusNotFound, "User Profile not found")
	}

	return c.JSON(http.StatusOK, userprofile)
}

func (up *UserProfileController) CreateUserProfile(c echo.Context) error {
	var userprofile model.UserProfile

	if err := c.Bind(&userprofile); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	validator := validator.New()

	if err := validator.Struct(userprofile); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	up.DB.Create(&userprofile)

	return c.JSON(http.StatusCreated, userprofile)
}

func (up *UserProfileController) UpdateUserProfile(c echo.Context) error {
	var userprofile model.UserProfile
	userprofileID := c.Param("id")

	up.DB.First(&userprofile, userprofileID)

	if userprofile.ID == 0 {
		return c.JSON(http.StatusNotFound, "User Profile not found")
	}

	if err := c.Bind(&userprofile); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	up.DB.Save(&userprofile)

	return c.JSON(http.StatusOK, userprofile)
}

func (up *UserProfileController) DeleteUserProfile(c echo.Context) error {
	var userprofile model.UserProfile
	userprofileID := c.Param("id")

	up.DB.First(&userprofile, userprofileID)

	if userprofile.ID == 0 {
		return c.JSON(http.StatusNotFound, "User Profile not found")
	}

	up.DB.Delete(&userprofile)

	return c.JSON(http.StatusOK, "User Profile deleted")
}
