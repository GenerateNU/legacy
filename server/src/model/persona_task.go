package model

import "github.com/google/uuid"

type PersonaTask struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey"`
	PersonaID uuid.UUID `gorm:"type:uuid"`
	TaskID    uuid.UUID `gorm:"type:uuid"`
}
