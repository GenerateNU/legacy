package services

import (
	"encoding/json"
	"server/src/models"
	"server/src/types"

	"gorm.io/gorm"
)

type ProfileServiceInterface interface {
	GetAllProfiles() ([]models.Profile, error)
	GetProfile(id string) (models.Profile, error)
	CreateProfile(profile models.Profile) (models.Profile, error)
	UpdateProfile(id string, profile models.Profile) (models.Profile, error)
	InsertOnboardingResponse(id string, onboardingResponse types.OnboardingResponse, profile models.Profile) (models.Profile, error)
	DeleteProfile(id string) error
}

type ProfileService struct {
	DB *gorm.DB
}

func (p *ProfileService) GetAllProfiles() ([]models.Profile, error) {
	var profiles []models.Profile

	if err := p.DB.Find(&profiles).Error; err != nil {
		return []models.Profile{}, err
	}

	return profiles, nil
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

func (p *ProfileService) InsertOnboardingResponse(id string, onboardingResponse types.OnboardingResponse, profile models.Profile) (models.Profile, error) {
	// Check if the user profile exists
	profile, err := p.GetProfile(id)
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

	// Update the user profile with the new onboarding response
	profile, err = p.UpdateProfile(id, profile)
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
