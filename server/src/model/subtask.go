package model

import (
	"time"
)

type Subtask struct {
	SubTaskID       uint      `gorm:"primaryKey"`
	TaskID          uint      `gorm:"column:task_id"`
	TaskName        string    `gorm:"column:task_name"`
	TaskDescription string    `gorm:"column:task_description"`
	CreatedAt       time.Time `gorm:"column:created_at"`
	Progress        bool      `gorm:"column:progress"`
}
