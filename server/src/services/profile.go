package services

import (
	"encoding/json"
	"fmt"
	"server/src/models"
	"server/src/types"
	"server/src/utils"

	"gorm.io/gorm"
)

type ProfileServiceInterface interface {
	GetProfile(id string) (models.Profile, error)
	CreateProfile(profile models.Profile) (models.Profile, error)
	UpdateProfile(id string, profile models.Profile) (models.Profile, error)
	InsertOnboardingResponse(userID string, profileID string, onboardingResponse types.OnboardingResponse) (models.Profile, error)
	DeleteProfile(id string) error
}

type ProfileService struct {
	DB *gorm.DB
}

func (p *ProfileService) GetProfile(id string) (models.Profile, error) {
	var profile models.Profile

	if err := p.DB.First(&profile, id).Error; err != nil {
		return models.Profile{}, err
	}

	return profile, nil
}

func (p *ProfileService) CreateProfile(profile models.Profile) (models.Profile, error) {
	if err := p.DB.Create(&profile).Error; err != nil {
		return models.Profile{}, err
	}

	return profile, nil
}

func (p *ProfileService) UpdateProfile(id string, profile models.Profile) (models.Profile, error) {
	var existingProfile models.Profile

	if err := p.DB.First(&existingProfile, id).Error; err != nil {
		return models.Profile{}, err
	}

	if err := p.DB.Model(&existingProfile).Updates(&profile).Error; err != nil {
		return models.Profile{}, err
	}

	return existingProfile, nil
}

func (p *ProfileService) InsertOnboardingResponse(userID string, profileID string, onboardingResponse types.OnboardingResponse) (models.Profile, error) {
	var profile models.Profile
	var userServiceInterface UserServiceInterface = &UserService{DB: p.DB}

	// Check if the user profile exists
	profile, err := p.GetProfile(profileID)
	if err != nil {
		return models.Profile{}, err
	}

	// check if user exists
	user, err := userServiceInterface.GetUser(userID)
	if err != nil {
		return models.Profile{}, err
	}

	// Check if the user profile already has an onboarding response
	if profile.OnboardingResponse != "{}" {
		return models.Profile{}, err
	}

	// Marshal the onboarding response into JSON
	response, err := json.Marshal(onboardingResponse)
	if err != nil {
		return models.Profile{}, err
	}

	// Update the OnboardingResponse field of the user profile
	profile.OnboardingResponse = string(response)
	profile.CompletedOnboardingResponse = true
	personaID, err := utils.CalculateScore(onboardingResponse)

	fmt.Println("PERSONAID", personaID)
	user.PersonaID = &personaID

	// Update the user profile with the new onboarding response
	profile, err = p.UpdateProfile(profileID, profile)
	if err != nil {
		return models.Profile{}, err
	}

	user, err = userServiceInterface.UpdateUser(userID, user)
	if err != nil {
		return models.Profile{}, err
	}

	return profile, nil
}

func (p *ProfileService) DeleteProfile(id string) error {
	var profile models.Profile

	if err := p.DB.First(&profile, id).Error; err != nil {
		return err
	}

	if err := p.DB.Delete(&profile).Error; err != nil {
		return err
	}

	return nil
}
