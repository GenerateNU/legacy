package models

import "gorm.io/gorm"

type File struct {
	gorm.Model
	FileName string `gorm:"type:varchar(255);unique" json:"file_name"`
	// FileDescription string `gorm:"type:text" json:"file_description" validate:"required"`
	UserID uint  `gorm:"foreignkey:User;unique" json:"user_id"`
	User   *User `gorm:"foreignkey:UserID" json:"-"`
}
