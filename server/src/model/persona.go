package model

type Persona struct {
	PersonaID          uint   `gorm:"primaryKey"`
	PersonaDescription string `gorm:"column:persona_description"`
	PersonaTitle       string `gorm:"column:persona_title"`
}
