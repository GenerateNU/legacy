package model

type Task struct {
	ID   uint   `gorm:"primaryKey"`
	Name string `gorm:"column:name"`
}
