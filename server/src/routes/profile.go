package routes

import (
	"server/src/controllers"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

func ProfileRoutes(g *echo.Group, profileService services.ProfileServiceInterface) {
	profileController := controllers.NewProfileController(profileService)

	g.GET("/:pid", profileController.GetProfile)
	g.POST("/", profileController.CreateProfile)
	g.PUT("/:pid", profileController.UpdateProfile)
	g.PUT("/response/:uid", profileController.InsertOnboardingResponse)
	g.DELETE("/:pid", profileController.DeleteProfile)
}
