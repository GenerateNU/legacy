package model

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey"`
	Username  string    `gorm:"column:username;unique"`
	Password  string    `gorm:"column:password"`
	Email     string    `gorm:"column:email;unique"`
	CreatedAt time.Time `gorm:"column:created_at"`
	UpdatedAt time.Time `gorm:"column:updated_at"`
	PersonaID uuid.UUID `gorm:"type:uuid"`
}
