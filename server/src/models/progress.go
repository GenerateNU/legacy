package models

import (
	"server/src/types"

	"gorm.io/gorm"
)

type TaskProgress struct {
	types.Model
	Progress uint  `gorm:"default:0" json:"progress"`
	UserID   uint  `json:"user_id"`
	TaskID   uint  `json:"task_id"`
	User     *User `gorm:"foreignkey:UserID" json:"-"`
	Task     *Task `gorm:"foreignkey:TaskID" json:"-"`
}

type SubTaskProgress struct {
	types.Model
	Completed bool     `gorm:"default:false" json:"completed"`
	UserID    uint     `json:"user_id"`
	SubTaskID uint     `json:"sub_task_id"`
	User      *User    `gorm:"foreignkey:UserID" json:"-"`
	SubTask   *SubTask `gorm:"foreignkey:SubTaskID" json:"-"`
}

func UpdateTaskProgress(db *gorm.DB, subTaskID uint) error {
	var completedCount int64

	// Count the number of completed subtasks for the associated task
	if err := db.Model(&SubTaskProgress{}).Where("sub_task_id = ? AND completed = ?", subTaskID, true).Count(&completedCount).Error; err != nil {
		return err
	}

	// Find the total number of subtasks for the associated task
	var totalSubTasks int64
	if err := db.Model(&SubTask{}).Where("task_id = ?", subTaskID).Count(&totalSubTasks).Error; err != nil {
		return err
	}

	// Calculate the progress percentage round to the nearest whole number
	progress := uint((float64(completedCount) / float64(totalSubTasks)) * 100)

	// Update the TaskProgress based on the calculated progress
	var subTask SubTask
	if err := db.First(&subTask, subTaskID).Error; err != nil {
		return err
	}

	if err := db.Model(&TaskProgress{}).Where("task_id = ?", subTask.TaskID).Updates(TaskProgress{Progress: progress}).Error; err != nil {
		return err
	}

	return nil
}

func (s *SubTaskProgress) BeforeSave(tx *gorm.DB) (err error) {
	if s.Completed { // Check if the subtask is being marked as completed
		// Update the task progress
		if err = UpdateTaskProgress(tx, s.SubTaskID); err != nil {
			return err
		}
	}
	return nil
}
