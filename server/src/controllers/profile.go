package controllers

import (
	"net/http"
	"server/src/models"
	"server/src/services"
	"server/src/types"

	"github.com/labstack/echo/v4"
)

type ProfileController struct {
	profileService services.ProfileServiceInterface
}

func NewProfileController(profileService services.ProfileServiceInterface) *ProfileController {
	return &ProfileController{profileService: profileService}
}

func (p *ProfileController) GetProfile(c echo.Context) error {
	profileID := c.Param("pid")
	profile, err := p.profileService.GetProfile(profileID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch profile")
	}

	return c.JSON(http.StatusOK, profile)
}

func (p *ProfileController) CreateProfile(c echo.Context) error {
	var profile models.Profile

	if err := services.ValidateData(c, profile); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to validate the data"+err.Error())
	}

	createdUserProfile, err := p.profileService.CreateProfile(profile)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to create the profile")
	}

	return c.JSON(http.StatusOK, createdUserProfile)
}

func (p *ProfileController) UpdateProfile(c echo.Context) error {
	var profile models.Profile

	if err := c.Bind(&profile); err != nil {
		return c.JSON(http.StatusNotFound, "Failed to bind profile")
	}

	profileID := c.Param("pid")
	profile, err := p.profileService.UpdateProfile(profileID, profile)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to update profile")
	}

	return c.JSON(http.StatusOK, profile)
}

func (p *ProfileController) InsertOnboardingResponse(c echo.Context) error {
	var profile models.Profile
	var onboardingResponse types.OnboardingResponse
	profileID := c.Param("pid")

	if err := c.Bind(&onboardingResponse); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to process the request")
	}

	// 1. Get Score
	// 2. Remove it from struct
	// 3. Calculate Score to determine persona
	// 4. Insert persona into user
	// 5. Return user
	profile, err := p.profileService.InsertOnboardingResponse(profileID, onboardingResponse, profile)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to insert onboarding response")
	}

	return c.JSON(http.StatusOK, profile)
}

func (p *ProfileController) DeleteProfile(c echo.Context) error {
	profileID := c.Param("pid")
	err := p.profileService.DeleteProfile(profileID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to delete profile")
	}

	return c.JSON(http.StatusOK, "Successfully deleted profile")
}
