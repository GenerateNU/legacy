package controller

import (
	"net/http"
	"server/src/model"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type PersonaController struct {
	DB *gorm.DB
}

func (u *PersonaController) GetAllPersonas(c echo.Context) error {
	var personas []model.Persona

	u.DB.Find(&personas)
	return c.JSON(http.StatusOK, personas)
}

func (u *PersonaController) GetPersona(c echo.Context) error {
	var persona model.Persona
	personaID := c.Param("pid")

	u.DB.First(&persona, personaID)

	if persona.ID == 0 {
		return c.JSON(http.StatusNotFound, "Persona not found")
	}

	return c.JSON(http.StatusOK, persona)
}

func (u *PersonaController) CreatePersona(c echo.Context) error {
	var persona model.Persona

	if err := c.Bind(&persona); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	validator := validator.New()

	if err := validator.Struct(persona); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	u.DB.Create(&persona)

	return c.JSON(http.StatusCreated, persona)
}

func (u *PersonaController) UpdatePersona(c echo.Context) error {
	var persona model.Persona
	personaID := c.Param("pid")

	u.DB.First(&persona, personaID)

	if persona.ID == 0 {
		return c.JSON(http.StatusNotFound, "Persona not found")
	}

	if err := c.Bind(&persona); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	u.DB.Save(&persona)

	return c.JSON(http.StatusOK, persona)
}

func (u *PersonaController) DeletePersona(c echo.Context) error {
	var persona model.Persona
	personaID := c.Param("pid")

	u.DB.First(&persona, personaID)

	if persona.ID == 0 {
		return c.JSON(http.StatusNotFound, "Persona not found")
	}

	u.DB.Delete(&persona)

	return c.JSON(http.StatusOK, "Persona deleted")
}

func (u *PersonaController) AddTasksToPersona(c echo.Context) error {
	var persona model.Persona
	personaID := c.Param("pid")

	u.DB.First(&persona, personaID)

	if persona.ID == 0 {
		return c.JSON(http.StatusNotFound, "Persona not found")
	}

	var taskIDs []uint
	if err := c.Bind(&taskIDs); err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid request body")
	}

	var tasks []model.Task
	if err := u.DB.Find(&tasks, taskIDs).Error; err != nil {
		return c.JSON(http.StatusNotFound, "One or more tasks not found")
	}

	u.DB.Model(&persona).Association("Tasks").Append(tasks)
	u.DB.Save(&persona)

	return c.JSON(http.StatusOK, persona)
}

func (u *PersonaController) GetPersonaTasks(c echo.Context) error {
	var persona model.Persona
	personaID := c.Param("pid")

	if err := u.DB.First(&persona, personaID).Error; err != nil {
		return c.JSON(http.StatusNotFound, "Persona not found")
	}

	// Retrieve tasks related to the persona
	var tasks []model.Task
	u.DB.Model(&persona).Association("Tasks").Find(&tasks)

	return c.JSON(http.StatusOK, tasks)
}
