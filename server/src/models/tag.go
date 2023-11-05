package models

import "server/src/types"

type Tag struct {
	types.Model
	Name  string `gorm:"type:varchar(255);unique" json:"name" validate:"required"`
	Tasks []Task `gorm:"many2many:task_tags;" json:"tasks"`
	Files []File `gorm:"many2many:file_tags;" json:"files"`
}
