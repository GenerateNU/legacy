package models

import (
	"time"

	"gorm.io/gorm"
)

type Profile struct {
	gorm.Model
	Name                        string    `gorm:"type:varchar(255)" json:"name" validate:"required"`
	DateOfBirth                 time.Time `gorm:"type:date" json:"date_of_birth" validate:"required"`
	PhoneNumber                 string    `gorm:"type:varchar(20)" json:"phone_number" validate:"required"`
	OnboardingResponse          string    `gorm:"type:jsonb;default:'{}'" json:"response"`
	CompletedOnboardingResponse bool      `gorm:"type:boolean;default:false" json:"completed_onboarding_response"`
	UserID                      uint      `gorm:"foreignkey:User;unique" json:"user_id"`
	User                        *User     `json:"-"`
}
