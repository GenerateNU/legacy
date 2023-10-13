package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"server/src/controller"
	"server/src/database"
	"sync"
	"syscall"
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

	var wg sync.WaitGroup
	wg.Add(1)

	go func() {
		defer wg.Done()

		if err := e.Start(":8080"); err != nil && err != http.ErrServerClosed {
			e.Logger.Fatalf("shutting down the server: %v", err)
		}
	}()

	// https://echo.labstack.com/cookbook/graceful-shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := e.Shutdown(ctx); err != nil {
		e.Logger.Fatalf("Error shutting down server: %v", err)
	}

	wg.Wait()
}
