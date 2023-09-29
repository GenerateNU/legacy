package model

import (
	"time"
)

type File struct {
	ID              int       `gorm:"primaryKey" json:"id"`
	FileName        string    `gorm:"column:file_name" json:"file_name"`
	FileDescription string    `gorm:"column:file_description" json:"file_description"`
	FilePath        string    `gorm:"column:file_path" json:"file_path"`
	CreatedAt       time.Time `gorm:"column:created_at" json:"created_at"`
	UpdatedAt       time.Time `gorm:"column:updated_at" json:"updated_at"`
	UserID          int       `json:"user_id"`
}
