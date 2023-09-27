package model

type PersonaTask struct {
	PersonaID uint `gorm:"primaryKey"`
	TaskID    uint `gorm:"primaryKey"`
}
