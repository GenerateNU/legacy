package controllers

import (
	"net/http"
	"server/src/models"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

type UserController struct {
	userService services.UserServiceInterface
}

func NewUserController(userService services.UserServiceInterface) *UserController {
	return &UserController{userService: userService}
}

// User godoc
//
//	@Summary		Gets all users
//	@Description	returns all users
//	@ID				get-all-users
//	@Tags			users
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	models.User
//	@Router			/api/users/ [get]
func (u *UserController) GetAllUsers(c echo.Context) error {
	users, err := u.userService.GetAllUsers()
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch users")
	}

	return c.JSON(http.StatusOK, users)
}

func (u *UserController) GetUser(c echo.Context) error {
	userID := c.Param("uid")
	user, err := u.userService.GetUser(userID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch user")
	}

	return c.JSON(http.StatusOK, user)
}

func (u *UserController) GetUserFromUsername(c echo.Context) error {
	username := c.Param("username")
	user, err := u.userService.GetUserFromUsername(username)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch user")
	}

	return c.JSON(http.StatusOK, user)
}

func (u *UserController) GetUserFromFirebaseID(c echo.Context) error {
	firebaseID := c.Param("firebase_id")
	user, err := u.userService.GetUserFromFirebaseID(firebaseID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch user")
	}

	return c.JSON(http.StatusOK, user)
}

func (u *UserController) GetUserPersona(c echo.Context) error {
	userID := c.Param("uid")
	persona, err := u.userService.GetUserPersona(userID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch user persona")
	}

	return c.JSON(http.StatusOK, persona)
}

func (u *UserController) GetUserProfile(c echo.Context) error {
	userID := c.Param("uid")
	profile, err := u.userService.GetUserProfile(userID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch user profile")
	}

	return c.JSON(http.StatusOK, profile)
}

func (u *UserController) CreateUser(c echo.Context) error {
	var user models.User

	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to process the request")
	}

	if err := services.ValidateData(c, user); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to validate the data"+err.Error())
	}

	createdUser, err := u.userService.CreateUser(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to create the user")
	}

	return c.JSON(http.StatusOK, createdUser)
}

func (u *UserController) InitializeUserProgress(c echo.Context) error {
	userID := c.Param("uid")

	task, subtask, err := u.userService.InitializeUserProgress(userID)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to initialize user progress")
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"task":    task,
		"subtask": subtask,
	})
}

func (u *UserController) UpdateUser(c echo.Context) error {
	var user models.User

	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusNotFound, "Failed to bind user")
	}

	userID := c.Param("uid")
	user, err := u.userService.UpdateUser(userID, user)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to update user")
	}

	return c.JSON(http.StatusOK, user)
}

func (u *UserController) DeleteUser(c echo.Context) error {
	userID := c.Param("uid")
	err := u.userService.DeleteUser(userID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to delete user")
	}

	return c.JSON(http.StatusOK, "User successfully deleted")
}
