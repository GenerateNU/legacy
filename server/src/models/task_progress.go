package models

import (
	"server/src/types"
)

type TaskProgress struct {
	types.Model
	Completed bool  `json:"completed" validate:"required"`
	UserID    uint  `json:"user_id" validate:"required"`
	TaskID    uint  `json:"task_id" validate:"required"`
	User      *User `gorm:"foreignkey:UserID" json:"-"`
	Task      *Task `gorm:"foreignkey:TaskID" json:"-"`
}
