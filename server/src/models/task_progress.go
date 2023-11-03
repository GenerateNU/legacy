package models

import (
	"server/src/types"
)

type TaskProgress struct {
	types.Model
	Completed bool  `gorm:"default:false" json:"completed"`
	UserID    uint  `json:"user_id"`
	TaskID    uint  `json:"task_id"`
	User      *User `gorm:"foreignkey:UserID" json:"-"`
	Task      *Task `gorm:"foreignkey:TaskID" json:"-"`
}
