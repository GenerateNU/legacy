package model

import "time"

type Task struct {
	ID              uint      `gorm:"primaryKey"`
	TaskName        string    `gorm:"column:task_name"`
	TaskDescription string    `gorm:"column:task_description"`
	CreatedAt       time.Time `gorm:"column:created_at"`
}
