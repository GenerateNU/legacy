package models

import "server/src/types"

type SubTask struct {
	types.Model
	TaskName        string `gorm:"type:varchar(255)" json:"task_name" validate:"required"`
	TaskDescription string `gorm:"type:text" json:"task_description" validate:"required"`
	TaskID          uint   `json:"task_id" validate:"required"`
	Task            *Task  `gorm:"foreignkey:TaskID" json:"-"`
}
