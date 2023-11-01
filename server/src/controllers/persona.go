package controllers

import (
	"net/http"
	"server/src/models"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

type PersonaController struct {
	personaService services.PersonaServiceInterface
}

func NewPersonaController(personaService services.PersonaServiceInterface) *PersonaController {
	return &PersonaController{personaService: personaService}
}

func (p *PersonaController) GetAllPersonas(c echo.Context) error {
	personas, err := p.personaService.GetAllPersonas()
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch personas")
	}

	return c.JSON(http.StatusOK, personas)
}

func (p *PersonaController) GetPersona(c echo.Context) error {
	personaID := c.Param("pid")
	persona, err := p.personaService.GetPersona(personaID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch persona")
	}

	return c.JSON(http.StatusOK, persona)
}

func (p *PersonaController) GetPersonaTasks(c echo.Context) error {
	personaID := c.Param("pid")
	tasks, err := p.personaService.GetPersonaTasks(personaID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch persona tasks")
	}

	return c.JSON(http.StatusOK, tasks)
}

func (p *PersonaController) CreatePersona(c echo.Context) error {
	var persona models.Persona

	if err := c.Bind(&persona); err != nil {
		return err
	}

	if err := services.ValidateData(c, persona); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to validate the data")
	}

	user, err := p.personaService.CreatePersona(persona)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to create persona")
	}

	return c.JSON(http.StatusOK, user)
}

func (p *PersonaController) UpdatePersona(c echo.Context) error {
	var persona models.Persona

	if err := c.Bind(&persona); err != nil {
		return c.JSON(http.StatusNotFound, "Failed to bind persona")
	}

	personaID := c.Param("pid")
	persona, err := p.personaService.UpdatePersona(personaID, persona)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to update persona")
	}

	return c.JSON(http.StatusOK, persona)
}

func (p *PersonaController) DeletePersona(c echo.Context) error {
	personaID := c.Param("pid")
	err := p.personaService.DeletePersona(personaID)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to delete persona")
	}

	return c.JSON(http.StatusOK, "Persona successfully deleted")
}
