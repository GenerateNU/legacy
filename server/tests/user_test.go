package controller

import (
	"net/http"
	"net/http/httptest"

	"server/src/controller"
	"server/src/database"

	"testing"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func initTestDB() (*echo.Echo, *gorm.DB) {
    e := echo.New()
    db, err := database.InitDB()
    if err != nil {
        panic("Failed to initialize the database: " + err.Error())
    }

    return e, db
}

func TestGetAllUsers(t *testing.T) {
    e, db := initTestDB()    

    req := httptest.NewRequest(http.MethodGet, "/v1/api/users", nil)
    rec := httptest.NewRecorder()
    c := e.NewContext(req, rec)

    userController := controller.UserController{DB: db}

    if err := userController.GetAllUsers(c); err != nil {
        t.Errorf("Error handling request: %v", err)
    }

    if rec.Code != http.StatusOK {
        t.Errorf("Expected status code %d, got %d", http.StatusOK, rec.Code)
    }
}

func TestGetUser(t *testing.T) {
    e, db := initTestDB()

    req := httptest.NewRequest(http.MethodGet, "/v1/api/users/1", nil)
    rec := httptest.NewRecorder()
    c := e.NewContext(req, rec)

    userController := controller.UserController{DB: db}

    if err := userController.GetUser(c); err != nil {
        t.Errorf("Error handling request: %v", err)
    }

    if rec.Code != http.StatusOK {
        t.Errorf("Expected status code %d, got %d", http.StatusOK, rec.Code)
    }
}