package model

import "github.com/google/uuid"

type Persona struct {
	ID                 uuid.UUID `gorm:"primaryKey"`
	PersonaDescription string    `gorm:"column:persona_description"`
	PersonaTitle       string    `gorm:"column:persona_title"`
}
