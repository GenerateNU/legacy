package model

type Persona struct {
	ID                 int    `gorm:"primaryKey" json:"id"`
	PersonaDescription string `gorm:"column:persona_description" json:"persona_description"`
	PersonaTitle       string `gorm:"column:persona_title" json:"persona_title"`
}
