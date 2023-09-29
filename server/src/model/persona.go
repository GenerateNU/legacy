package model

type Persona struct {
	ID                 uint   `gorm:"primaryKey"`
	PersonaDescription string `gorm:"column:persona_description"`
	PersonaTitle       string `gorm:"column:persona_title"`
}
