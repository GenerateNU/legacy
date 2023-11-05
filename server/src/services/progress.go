package services

import (
	"errors"
	"server/src/models"
	"strconv"

	"gorm.io/gorm"
)

type ProgressServiceInterface interface {
	GetAllTaskProgress() ([]models.TaskProgress, error)
	GetAllSubTaskProgress() ([]models.SubTaskProgress, error)

	GetTaskProgress(id string) (models.TaskProgress, error)
	GetSubTaskProgress(id string) (models.SubTaskProgress, error)

	CreateAllTaskProgress(id string) ([]models.TaskProgress, error)
	CreateAllSubTaskProgress(id string) ([]models.SubTaskProgress, error)

	CreateTaskProgress(taskProgress models.TaskProgress) (models.TaskProgress, error)
	CreateSubTaskProgress(subTaskProgress models.SubTaskProgress) (models.SubTaskProgress, error)

	CompleteTaskProgress(id string, taskProgress models.TaskProgress) (models.TaskProgress, error)
	CompleteSubTaskProgress(id string, subTaskProgress models.SubTaskProgress) (models.SubTaskProgress, error)

	DeleteTaskProgress(id string) error
	DeleteSubTaskProgress(id string) error
}

type ProgressService struct {
	DB *gorm.DB
}

func (p *ProgressService) GetAllTaskProgress() ([]models.TaskProgress, error) {
	var taskProgress []models.TaskProgress

	if err := p.DB.Find(&taskProgress).Error; err != nil {
		return nil, err
	}

	return taskProgress, nil
}

func (p *ProgressService) GetAllSubTaskProgress() ([]models.SubTaskProgress, error) {
	var subTaskProgress []models.SubTaskProgress

	if err := p.DB.Find(&subTaskProgress).Error; err != nil {
		return nil, err
	}

	return subTaskProgress, nil
}

func (p *ProgressService) GetTaskProgress(id string) (models.TaskProgress, error) {
	var taskProgress models.TaskProgress

	if err := p.DB.First(&taskProgress, id).Error; err != nil {
		return models.TaskProgress{}, err
	}

	return taskProgress, nil
}

func (p *ProgressService) GetSubTaskProgress(id string) (models.SubTaskProgress, error) {
	var subTaskProgress models.SubTaskProgress

	if err := p.DB.First(&subTaskProgress, id).Error; err != nil {
		return models.SubTaskProgress{}, err
	}

	return subTaskProgress, nil
}

func (p *ProgressService) CreateAllTaskProgress(id string) ([]models.TaskProgress, error) {
	var taskServiceInterace TaskServiceInterface = &TaskService{DB: p.DB}
	var allTaskProgress []models.TaskProgress

	var existingTaskProgress []models.TaskProgress
	var count int64
	if err := p.DB.Where("user_id = ?", id).Find(&existingTaskProgress).Count(&count).Error; err != nil {
		return nil, errors.New("failed to fetch existing task progress")
	}

	if count > 0 {
		return nil, errors.New("user already has task progress")
	}

	tasks, err := taskServiceInterace.GetAllTasks()
	if err != nil {
		return nil, err
	}

	userIDInt, err := strconv.Atoi(id)
	if err != nil {
		return nil, errors.New("failed to convert user id to int")
	}

	for _, task := range tasks {
		taskProgress, err := p.CreateTaskProgress(models.TaskProgress{
			TaskID:    task.ID,
			UserID:    uint(userIDInt),
			Completed: false,
		})
		if err != nil {
			return nil, errors.New("failed to create task progress")
		}

		allTaskProgress = append(allTaskProgress, taskProgress)
	}

	return allTaskProgress, nil
}

func (p *ProgressService) CreateAllSubTaskProgress(id string) ([]models.SubTaskProgress, error) {
	var subTaskServiceInterface SubTaskServiceInterface = &SubTaskService{DB: p.DB}
	var allSubTaskProgress []models.SubTaskProgress

	subtasks, err := subTaskServiceInterface.GetAllSubTasks()
	if err != nil {
		return nil, err
	}

	userIDInt, err := strconv.Atoi(id)
	if err != nil {
		return nil, err
	}

	for _, subtask := range subtasks {
		subtaskProgress, err := p.CreateSubTaskProgress(models.SubTaskProgress{
			SubTaskID: subtask.ID,
			UserID:    uint(userIDInt),
			Completed: false,
		})
		if err != nil {
			return nil, err
		}

		allSubTaskProgress = append(allSubTaskProgress, subtaskProgress)
	}

	return allSubTaskProgress, nil
}

func (p *ProgressService) CreateTaskProgress(taskProgress models.TaskProgress) (models.TaskProgress, error) {
	if err := p.DB.Create(&taskProgress).Error; err != nil {
		return models.TaskProgress{}, err
	}

	return taskProgress, nil
}

func (p *ProgressService) CreateSubTaskProgress(subTaskProgress models.SubTaskProgress) (models.SubTaskProgress, error) {
	if err := p.DB.Create(&subTaskProgress).Error; err != nil {
		return models.SubTaskProgress{}, err
	}

	return subTaskProgress, nil
}

func (p *ProgressService) CompleteTaskProgress(id string, taskProgress models.TaskProgress) (models.TaskProgress, error) {
	var existingTaskProgress models.TaskProgress

	if err := p.DB.First(&existingTaskProgress, id).Error; err != nil {
		return models.TaskProgress{}, err
	}

	if err := p.DB.Model(&existingTaskProgress).Updates(taskProgress).Error; err != nil {
		return models.TaskProgress{}, err
	}

	return existingTaskProgress, nil
}

func (p *ProgressService) CompleteSubTaskProgress(id string, subTaskProgress models.SubTaskProgress) (models.SubTaskProgress, error) {
	var existingSubTaskProgress models.SubTaskProgress

	if err := p.DB.First(&existingSubTaskProgress, id).Error; err != nil {
		return models.SubTaskProgress{}, err
	}

	if err := p.DB.Model(&existingSubTaskProgress).Updates(subTaskProgress).Error; err != nil {
		return models.SubTaskProgress{}, err
	}

	return existingSubTaskProgress, nil
}

func (p *ProgressService) DeleteTaskProgress(id string) error {
	var taskProgress models.TaskProgress

	if err := p.DB.First(&taskProgress, id).Error; err != nil {
		return err
	}

	if err := p.DB.Delete(&taskProgress).Error; err != nil {
		return err
	}

	return nil
}

func (p *ProgressService) DeleteSubTaskProgress(id string) error {
	var subTaskProgress models.SubTaskProgress

	if err := p.DB.First(&subTaskProgress, id).Error; err != nil {
		return err
	}

	if err := p.DB.Delete(&subTaskProgress).Error; err != nil {
		return err
	}

	return nil
}
