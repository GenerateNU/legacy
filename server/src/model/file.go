package model

import "gorm.io/gorm"

type File struct {
	gorm.Model
	FileName        string `gorm:"type:varchar(255)" json:"file_name"`
	FileDescription string `gorm:"type:text" json:"file_description"`
	FilePath        string `gorm:"type:varchar(255)" json:"file_path"`
	UserID          uint   `json:"user_id"`
	User            User   `gorm:"foreignkey:UserID"`
}
