package model

import (
	"time"
)

type Subtask struct {
	ID              int       `gorm:"primaryKey" json:"id"`
	TaskName        string    `gorm:"column:task_name" json:"task_name"`
	TaskDescription string    `gorm:"column:task_description" json:"task_description"`
	CreatedAt       time.Time `gorm:"column:created_at" json:"created_at"`
	TaskID          int       `json:"task_id"`
}
