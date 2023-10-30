package model

import (
	"time"

	"gorm.io/gorm"
)

type Guide struct {
	gorm.Model
	GuideName string    `gorm:"type:varchar(255)" json:"guide_name"`
	Title     string    `gorm:"type:varchar(255)" json:"title"`
	SubTitle  string    `gorm:"type:varchar(255)" json:"sub_title"`
	Author    string    `gorm:"type:varchar(255)" json:"author"`
	MinsRead  uint      `json:"mins_read"`
	Date      time.Time `json:"date"`
	FullText  string    `gorm:"type:text" json:"full_text"`
}
