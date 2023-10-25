package services

import (
	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
)

// Validate the data sent to the server if the data is invalid, return an error otherwise, return nil
func validateData(c echo.Context, data interface{}) error {
	if err := c.Bind(data); err != nil {
		return err
	}

	validator := validator.New()
	if err := validator.Struct(data); err != nil {
		return err
	}

	return nil
}
