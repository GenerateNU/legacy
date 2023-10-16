package model

import "gorm.io/gorm"

type Persona struct {
	gorm.Model
	PersonaDescription string `gorm:"type:text" json:"persona_description"`
	PersonaTitle       string `gorm:"type:varchar(255)" json:"persona_title"`
	Tasks              []Task `gorm:"many2many:persona_tasks;"`
}
