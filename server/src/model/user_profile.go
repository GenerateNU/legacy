package model

import (
	"time"

	"gorm.io/gorm"
)

type UserProfile struct {
	gorm.Model
	Name               string    `gorm:"type:varchar(255)" json:"name"`
	DateOfBirth        time.Time `gorm:"type:date" json:"date_of_birth"`
	PhoneNumber        string    `gorm:"type:varchar(20)" json:"phone_number"`
	OnboardingResponse string    `gorm:"type:jsonb;default:'{}'" json:"response"`
	UserID             uint      `gorm:"foreignkey:User;unique" json:"user_id"`
	User               User      `json:"-"`
}
