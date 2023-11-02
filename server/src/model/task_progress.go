package model

import "gorm.io/gorm"

type TaskProgress struct {
	gorm.Model
	Completed bool `json:"completed"`
	UserID    uint `json:"user_id"`
	TaskID    uint `json:"task_id"`
	User      User `gorm:"foreignkey:UserID" json:"-"`
	Task      Task `gorm:"foreignkey:TaskID" json:"-"`
}
