package model

import "github.com/google/uuid"

type Progress struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey"`
	Completed bool      `gorm:"column:completed"`
	UserID    uuid.UUID `gorm:"type:uuid"`
	TaskID    uuid.UUID `gorm:"type:uuid"`
}
