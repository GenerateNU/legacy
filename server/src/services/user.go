package services

import (
	"server/src/model"
	"time"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type UserServiceInterface interface {
	GetAllUsers(c echo.Context) ([]model.User, error)
	GetUser(c echo.Context) (*model.User, error)
	CreateUser(c echo.Context) (*model.User, error)
	UpdateUser(c echo.Context) (*model.User, error)
	DeleteUser(c echo.Context) error
}

type UserService struct {
	DB *gorm.DB
}

func (u *UserService) GetAllUsers(c echo.Context) ([]model.User, error) {
	var users []model.User

	if err := u.DB.Omit("password").Find(&users).Error; err != nil {
		return nil, err
	}

	return users, nil
}

func (u *UserService) GetUser(c echo.Context) (*model.User, error) {
	var user *model.User

	userID := c.Param("uid")

	if err := u.DB.Omit("password").First(&user, userID).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func (u *UserService) CreateUser(c echo.Context) (*model.User, error) {
	var user *model.User

	if err := validateData(c, &user); err != nil {
		return nil, err
	}

	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()

	if result := u.DB.Create(&user); result.Error != nil {
		return nil, result.Error
	}

	return user, nil
}

func (u *UserService) UpdateUser(c echo.Context) (*model.User, error) {
	var user *model.User

	userID := c.Param("uid")

	if err := u.DB.First(&user, userID).Error; err != nil {
		return nil, err
	}

	if err := c.Bind(&user); err != nil {
		return nil, err
	}

	u.DB.Save(&user)

	user.Password = ""

	return user, nil
}

func (u *UserService) DeleteUser(c echo.Context) error {
	var user model.User
	userID := c.Param("uid")

	if err := u.DB.First(&user, userID).Error; err != nil {
		return err
	}

	u.DB.Delete(&user)

	return nil
}
