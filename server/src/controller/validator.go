package controller

import (
	"net/http"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
)

// Handle an error by returning a JSON response with the error message
func handleError(c echo.Context, status int, message string) error {
	return c.JSON(status, map[string]string{"error": message})
}

// Validate the data sent to the server if the data is invalid, return an error otherwise, return nil
func validateData(c echo.Context, data interface{}) error {
	if err := c.Bind(data); err != nil {
		return handleError(c, http.StatusBadRequest, err.Error())
	}

	validator := validator.New()
	if err := validator.Struct(data); err != nil {
		return handleError(c, http.StatusBadRequest, err.Error())
	}

	return nil
}
