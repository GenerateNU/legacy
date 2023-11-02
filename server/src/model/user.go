package model

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username   string  `gorm:"type:varchar(255);unique" json:"username"`
	FirebaseID string  `gorm:"type:varchar(255);unique" json:"firebase_id"`
	Password   string  `gorm:"type:text" json:"password"`
	Email      string  `gorm:"type:varchar(255);unique" json:"email"`
	PersonaID  uint    `json:"persona_id"`
	Persona    Persona `gorm:"foreignkey:PersonaID" json:"persona"`
}
