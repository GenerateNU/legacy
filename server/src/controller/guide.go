package controller

import (
	"net/http"
	"server/src/model"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type GuideController struct {
	DB *gorm.DB
}

func (g *GuideController) CreateGuide(c echo.Context) error {
	var guide model.Guide

	// Bind the data sent in the POST request to the guide model
	if err := c.Bind(&guide); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	// Checks if the binded data is valid according to the rules defined in the model
	validator := validator.New()
	if err := validator.Struct(guide); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	g.DB.Create(&guide)

	return c.JSON(http.StatusCreated, guide)
}

func (g *GuideController) GetGuide(c echo.Context) error {
	var guide model.Guide
	guideID := c.Param("gid")

	result := g.DB.First(&guide, guideID)

	if result.Error != nil {
		return c.JSON(http.StatusNotFound, result.Error.Error())
	}

	return c.JSON(http.StatusOK, guide)
}

func (g *GuideController) DeleteGuide(c echo.Context) error {
	var guide model.Guide
	guideID := c.Param("gid")

	result := g.DB.First(&guide, guideID)

	if result.Error != nil {
		return c.JSON(http.StatusNotFound, result.Error.Error())
	}

	g.DB.Delete(&guide)

	return c.JSON(http.StatusOK, "Guide deleted")
}
