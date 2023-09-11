package model

import (
	"time"
)

type User struct {
    ID        uint   `gorm:"primaryKey"`
    Name      string `gorm:"column:name"`
    Email     string `gorm:"column:email"`
    Password  string `gorm:"column:password"`
    CreatedAt time.Time `gorm:"column:created_at"`
    UpdatedAt time.Time `gorm:"column:updated_at"`
}
