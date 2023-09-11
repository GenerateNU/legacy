package main

import (
	"log"
	"server/src/controller"
	"server/src/database"

	"github.com/labstack/echo/v4"
)

func main() {
    e := echo.New()

    db, err := database.InitDB()
    if err != nil {
        log.Fatal("Failed to initialize the database: ", err)
    }

	controller.SetupControllers(e, db)

    e.Logger.Fatal(e.Start(":8080"))
}
