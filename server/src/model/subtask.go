package model

import (
	"gorm.io/gorm"
)

type SubTask struct {
	gorm.Model
	TaskName string `gorm:"type:varchar(255)" json:"task_name"`
	TaskDesc string `gorm:"type:text" json:"task_description"`
	TaskID   uint   `json:"task_id"`
	Task     Task   `gorm:"foreignkey:TaskID"`
}
