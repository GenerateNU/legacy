package model

type Progress struct {
	ID        int  `gorm:"primaryKey" json:"id"`
	Completed bool `gorm:"column:completed" json:"completed"`
	UserID    int  `json:"user_id"`
	TaskID    int  `json:"task_id"`
}
