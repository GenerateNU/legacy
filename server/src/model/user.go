package model

import (
	"time"
)

//	{
//	  "username": "admin",
//	  "password": "admin",
//	  "email": "admin@admin",
//	  "persona_id": 1,
//	}
type User struct {
	ID        int       `gorm:"primaryKey" json:"id"`
	Username  string    `gorm:"column:username;unique" json:"username"`
	Password  string    `gorm:"column:password" json:"password"`
	Email     string    `gorm:"column:email;unique" json:"email"`
	CreatedAt time.Time `gorm:"column:created_at" json:"created_at"`
	UpdatedAt time.Time `gorm:"column:updated_at" json:"updated_at"`
	PersonaID int       `json:"persona_id"`
}
