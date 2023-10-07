package model

import "gorm.io/gorm"

type PersonaTaskJunction struct {
	gorm.Model
	PersonaID int     `json:"persona_id"`
	TaskID    uint    `json:"task_id"`
	Persona   Persona `gorm:"foreignkey:PersonaID"`
	Task      Task    `gorm:"foreignkey:TaskID"`
}
