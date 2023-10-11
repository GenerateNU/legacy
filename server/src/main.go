package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"server/src/controller"
	"server/src/database"
	"time"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	db, err := database.InitDB()
	if err != nil {
		log.Fatal("Failed to initialize the database: ", err)
	}

	controller.SetupControllers(e, db)

	// https://echo.labstack.com/docs/cookbook/graceful-shutdown
	go func() {
		if err := e.Start(":8080"); err != nil && err != http.ErrServerClosed {
			e.Logger.Fatal("Shutting down the server")
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server with a timeout of 10 seconds.
	// Use a buffered channel to avoid missing signals as recommended for signal.Notify
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := e.Shutdown(ctx); err != nil {
		e.Logger.Fatal(err)
	}
}
