package models

import (
	"gorm.io/gorm"
)

type Task struct {
	gorm.Model
	TaskName        string    `gorm:"type:varchar(255)" json:"task_name" validate:"required"`
	TaskDescription string    `gorm:"type:text" json:"task_description" validate:"required"`
	Personas        []Persona `gorm:"many2many:persona_tasks;"`
}
