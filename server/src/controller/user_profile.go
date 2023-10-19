package controller

import (
	"encoding/json"
	"net/http"
	"server/src/model"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type UserProfileController struct {
	DB *gorm.DB
}

func (up *UserProfileController) GetUserProfile(c echo.Context) error {
	var userprofile model.UserProfile
	userprofileID := c.Param("upid")

	up.DB.First(&userprofile, userprofileID)

	if userprofile.ID == 0 {
		return c.JSON(http.StatusNotFound, "User Profile not found")
	}

	return c.JSON(http.StatusOK, userprofile)
}

func (up *UserProfileController) CreateUserProfile(c echo.Context) error {
	var user model.User
	userID := c.Param("uid")

	// Check if the user exists
	err := up.DB.First(&user, userID).Error
	if err != nil {
		return c.JSON(http.StatusNotFound, "User not found")
	}

	// Check if a user profile already exists for the user
	var existingProfile model.UserProfile
	err = up.DB.Where("user_id = ?", user.ID).First(&existingProfile).Error
	if err == nil {
		return c.JSON(http.StatusConflict, "User profile already exists")
	}

	var userProfile model.UserProfile
	if err := c.Bind(&userProfile); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// Associate the profile with the user
	userProfile.UserID = user.ID

	// Validate the user profile data before creating
	validator := validator.New()
	if err := validator.Struct(userProfile); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// Create the user profile
	result := up.DB.Create(&userProfile)
	if result.Error != nil {
		return handleError(c, http.StatusBadRequest, result.Error.Error())
	}

	return c.JSON(http.StatusCreated, userProfile)
}

func (up *UserProfileController) UpdateUserProfile(c echo.Context) error {
	var userprofile model.UserProfile
	userprofileID := c.Param("upid")

	up.DB.First(&userprofile, userprofileID)

	if userprofile.ID == 0 {
		return c.JSON(http.StatusNotFound, "User Profile not found")
	}

	if err := validateData(c, &userprofile); err != nil {
		return err
	}

	up.DB.Save(&userprofile)

	return c.JSON(http.StatusOK, userprofile)
}

type OnboardingResponse struct {
	WorldviewQ1         string `json:"worldviewQ1"`
	WorldviewQ2         string `json:"worldviewQ2"`
	WorldviewQ3         string `json:"worldviewQ3"`
	WorldviewQ4         string `json:"worldviewQ4"`
	WorldviewQ5         string `json:"worldviewQ5"`
	WorldviewQ6         string `json:"worldviewQ6"`
	EmotionalPatternQ1  string `json:"emotionalPatternQ1"`
	EmotionalPatternQ2  string `json:"emotionalPatternQ2"`
	EmotionalPatternQ3  string `json:"emotionalPatternQ3"`
	WorkstyleQ1         string `json:"workstyleQ1"`
	WorkstyleQ2         string `json:"workstyleQ2"`
	WorkstyleQ3         string `json:"workstyleQ3"`
	WorkstyleQ4         string `json:"workstyleQ4"`
	SocialInclinationQ1 string `json:"socialInclinationQ1"`
	SocialInclinationQ2 string `json:"socialInclinationQ2"`
	SocialInclinationQ3 string `json:"socialInclinationQ3"`
	FunnelActivitiesQ1  string `json:"funnelActivitiesQ1"`
	FunnelActivitiesQ2  string `json:"funnelActivitiesQ2"`
}

func (up *UserProfileController) CreateOnboardingResponse(c echo.Context) error {
	var user model.User
	var onboardingResponse OnboardingResponse
	var response []byte
	userID := c.Param("uid")

	// Check if the user exists
	err := up.DB.First(&user, userID).Error
	if err != nil {
		return c.JSON(http.StatusNotFound, "User not found")
	}

	// Check if a user profile already exists for the user
	var existingProfile model.UserProfile
	err = up.DB.Where("user_id = ?", user.ID).First(&existingProfile).Error
	if err != nil {
		return c.JSON(http.StatusNotFound, "User profile not found")
	}

	if err := c.Bind(&onboardingResponse); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// Associate the profile with the user
	response, err = json.Marshal(onboardingResponse)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	existingProfile.OnboardingResponse = string(response)

	// Validate the user profile data before creating
	validator := validator.New()

	if err := validator.Struct(existingProfile); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// Create the user profile
	result := up.DB.Save(&existingProfile)
	if result.Error != nil {
		return handleError(c, http.StatusBadRequest, result.Error.Error())
	}

	return c.JSON(http.StatusCreated, existingProfile)
}

func (up *UserProfileController) DeleteUserProfile(c echo.Context) error {
	var userprofile model.UserProfile
	userprofileID := c.Param("upid")

	up.DB.First(&userprofile, userprofileID)

	if userprofile.ID == 0 {
		return c.JSON(http.StatusNotFound, "User Profile not found")
	}

	up.DB.Delete(&userprofile)

	return c.JSON(http.StatusOK, "User Profile deleted")
}
