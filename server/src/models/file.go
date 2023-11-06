package models

import (
	"server/src/types"
)

type File struct {
	types.Model
	FileName  string `gorm:"type:varchar(255)" json:"file_name"`
	ObjectKey string `gorm:"type:varchar(255);unique" json:"object_key"`
	UserID    uint   `gorm:"foreignkey:User" json:"user_id"`
	User      *User  `gorm:"foreignkey:UserID" json:"-"`
	Tags      []*Tag `gorm:"many2many:file_tags;" json:"tags"`
}
