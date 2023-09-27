package model

type Progress struct {
	ProgressID uint `gorm:"primaryKey"`
	UserID     uint `gorm:"column:user_id"`
	TaskID     uint `gorm:"column:task_id"`
}
