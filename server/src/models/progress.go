package models

import (
	"server/src/types"
)

type SubTaskProgress struct {
	types.Model
	Completed bool     `gorm:"default:false" json:"completed"`
	UserID    uint     `json:"user_id"`
	SubTaskID uint     `json:"subtask_id"`
	User      *User    `gorm:"foreignkey:UserID" json:"-"`
	SubTask   *SubTask `gorm:"foreignkey:SubTaskID" json:"-"`
}
