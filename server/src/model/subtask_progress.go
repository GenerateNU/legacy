package model

import "gorm.io/gorm"

type SubTaskProgress struct {
	gorm.Model
	Completed bool    `json:"completed"`
	UserID    int     `json:"user_id"`
	SubTaskID int     `json:"subtask_id"`
	User      User    `gorm:"foreignkey:UserID" json:"-"`
	SubTask   SubTask `gorm:"foreignkey:SubTaskID" json:"-"`
}
