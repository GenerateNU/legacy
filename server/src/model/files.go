package model

import (
	"time"
)

type File struct {
	FileID          uint      `gorm:"primaryKey"`
	FileName        string    `gorm:"column:file_name"`
	FileDescription string    `gorm:"column:file_description"`
	FilePath        string    `gorm:"column:file_path"`
	CreatedAt       time.Time `gorm:"column:created_at"`
	UpdatedAt       time.Time `gorm:"column:updated_at"`
	UserID          uint      `gorm:"column:user_id"`
}
