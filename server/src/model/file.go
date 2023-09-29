package model

import (
	"time"

	"github.com/google/uuid"
)

type File struct {
	ID              uuid.UUID `gorm:"type:uuid;primaryKey"`
	FileName        string    `gorm:"column:file_name"`
	FileDescription string    `gorm:"column:file_description"`
	FilePath        string    `gorm:"column:file_path"`
	CreatedAt       time.Time `gorm:"column:created_at"`
	UpdatedAt       time.Time `gorm:"column:updated_at"`
	UserID          uuid.UUID `gorm:"type:uuid"`
}
