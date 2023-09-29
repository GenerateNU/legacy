package model

type PersonaTask struct {
	ID        int `gorm:"primaryKey" json:"id"`
	PersonaID int `json:"persona_id"`
	TaskID    int `json:"task_id"`
}
