package models

import "gorm.io/gorm"

type SubTaskProgress struct {
	gorm.Model
	Completed bool     `json:"completed" validate:"required"`
	UserID    int      `json:"user_id" validate:"required"`
	SubTaskID int      `json:"subtask_id" validate:"required"`
	User      *User    `gorm:"foreignkey:UserID" json:"-"`
	SubTask   *SubTask `gorm:"foreignkey:SubTaskID" json:"-"`
}
