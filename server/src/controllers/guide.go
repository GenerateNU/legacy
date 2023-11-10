package controllers

import (
	"net/http"
	"server/src/models"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

type guideController struct {
	guideService services.GuideServiceInterface
}

func NewGuideController(guideService services.GuideServiceInterface) *guideController {
	return &guideController{guideService: guideService}
}

func (g *guideController) GetAllGuides(c echo.Context) error {
	guides, err := g.guideService.GetAllGuides()
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch guides")
	}

	return c.JSON(http.StatusOK, guides)
}

func (g *guideController) GetGuide(c echo.Context) error {
	guideName := c.Param("g_name")
	guide, err := g.guideService.GetGuide(guideName)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch guide")
	}

	return c.JSON(http.StatusOK, guide)
}

func (g *guideController) CreateGuide(c echo.Context) error {
	var guide models.Guide

	if err := c.Bind(&guide); err != nil {
		return err
	}

	if err := services.ValidateData(c, guide); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to validate the data")
	}

	user, err := g.guideService.CreateGuide(guide)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to create guide")
	}

	return c.JSON(http.StatusOK, user)
}

func (g *guideController) UpdateGuide(c echo.Context) error {
	var guide models.Guide

	if err := c.Bind(&guide); err != nil {
		return c.JSON(http.StatusNotFound, "Failed to bind guide")
	}

	guideID := c.Param("g_name")
	guide, err := g.guideService.UpdateGuide(guideID, guide)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to update guide")
	}

	return c.JSON(http.StatusOK, guide)
}

func (g *guideController) DeleteGuide(c echo.Context) error {
	guideName := c.Param("g_name")
	err := g.guideService.DeleteGuide(guideName)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to delete guide")
	}

	return c.JSON(http.StatusOK, "Guide successfully deleted")
}
