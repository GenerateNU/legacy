package controllers

import (
	"encoding/json"
	"io"
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

	if err := c.Bind(&profile); err != nil {
		return err
	}

	if err := services.ValidateData(c, profile); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to validate the data"+err.Error())
	}

	createdProfile, err := p.profileService.CreateProfile(profile)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to create the profile")
	}

	return c.JSON(http.StatusOK, createdProfile)
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

// Then in your controller:
func (p *ProfileController) InsertOnboardingResponse(c echo.Context) error {
	var onboardingResponse types.OnboardingResponse
	var requestBody types.RequestBody
	profileID := c.Param("pid")
	userID := c.Param("uid")

	body, err := io.ReadAll(c.Request().Body)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to read request body")
	}
	defer c.Request().Body.Close()

	if err := json.Unmarshal(body, &requestBody); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to process the request body")
	}

	// Unmarshal the nested JSON string inside "body" into onboardingResponse
	if err := json.Unmarshal([]byte(requestBody.Body), &onboardingResponse); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to process the onboarding response")
	}

	profile, err := p.profileService.InsertOnboardingResponse(userID, profileID, onboardingResponse)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to process onboarding response")
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
