package model

import (
	"time"
)

type UserProfile struct {
	ID                 int                    `gorm:"primaryKey" json:"id"`
	Name               string                 `gorm:"column:name" json:"name"`
	DateOfBirth        time.Time              `gorm:"column:date_of_birth" json:"date_of_birth"`
	PhoneNumber        string                 `gorm:"column:phone_number" json:"phone_number"`
	Age                int                    `gorm:"column:age" json:"age"`
	OnboardingResponse map[string]interface{} `gorm:"type:jsonb" json:"onboarding_response"`
	UserID             int                    `json:"user_id"`
}
