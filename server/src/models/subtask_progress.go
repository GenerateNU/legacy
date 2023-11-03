package models

import (
	"server/src/types"
)

type SubTaskProgress struct {
	types.Model
	Completed bool     `json:"completed" validate:"required"`
	UserID    int      `json:"user_id" validate:"required"`
	SubTaskID int      `json:"subtask_id" validate:"required"`
	User      *User    `gorm:"foreignkey:UserID" json:"-"`
	SubTask   *SubTask `gorm:"foreignkey:SubTaskID" json:"-"`
}
