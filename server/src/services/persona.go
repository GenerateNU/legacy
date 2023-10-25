package services

import (
	"server/src/model"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type PersonaServices struct {
	DB *gorm.DB
}

func (u *PersonaServices) GetPersonaAllTasks(c echo.Context) ([]map[string]interface{}, error) {
	var persona model.Persona
	personaID := c.Param("pid")

	if err := u.DB.First(&persona, personaID).Error; err != nil {
		return nil, err
	}

	// Retrieve tasks related to the persona
	var tasks []model.Task
	u.DB.Model(&persona).Association("Tasks").Find(&tasks)

	// Create a slice to store the JSON response
	var taskList []map[string]interface{}

	// Loop through the tasks and retrieve their related subtasks
	for _, task := range tasks {
		var subtasks []model.SubTask
		if err := u.DB.Where("task_id = ?", task.ID).Find(&subtasks).Error; err != nil {
			subtasks = []model.SubTask{} // No subtasks found
		}

		// Form the JSON response for each task with its related subtasks
		taskInfo := map[string]interface{}{
			"task":     task,
			"subtasks": subtasks,
		}

		taskList = append(taskList, taskInfo)
	}

	return taskList, nil
}
