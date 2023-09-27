package model

import (
	"time"
)

type UserProfile struct {
	ProfileID          uint                   `gorm:"primaryKey"`
	UserID             uint                   `gorm:"unique"`
	Name               string                 `gorm:"column:name"`
	DateOfBirth        time.Time              `gorm:"column:date_of_birth"`
	PhoneNumber        string                 `gorm:"column:phone_number"`
	Age                int                    `gorm:"column:age"`
	OnboardingResponse map[string]interface{} `gorm:"type:jsonb"`
}
