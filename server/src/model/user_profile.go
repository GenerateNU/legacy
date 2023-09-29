package model

import (
	"time"

	"github.com/google/uuid"
)

type UserProfile struct {
	ID                 uuid.UUID              `gorm:"type:uuid;primaryKey"`
	Name               string                 `gorm:"column:name"`
	DateOfBirth        time.Time              `gorm:"column:date_of_birth"`
	PhoneNumber        string                 `gorm:"column:phone_number"`
	Age                int                    `gorm:"column:age"`
	OnboardingResponse map[string]interface{} `gorm:"type:jsonb"`
	UserID             uuid.UUID              `gorm:"type:uuid;unique"`
}
