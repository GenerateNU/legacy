package model

import (
	"time"

	"github.com/google/uuid"
)

type Task struct {
	ID              uuid.UUID `gorm:"type:uuid;primaryKey"`
	TaskName        string    `gorm:"column:task_name"`
	TaskDescription string    `gorm:"column:task_description"`
	CreatedAt       time.Time `gorm:"column:created_at"`
}
