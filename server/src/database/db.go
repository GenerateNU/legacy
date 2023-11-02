package database

import (
	"fmt"
	"server/src/model"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func connectDatabase(host, user, password, dbname, port string) (*gorm.DB, error) {
	var dsn string
	if dbname != "" {
		dsn = fmt.Sprintf(
			"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
			host, user, password, dbname, port,
		)
	} else {
		dsn = fmt.Sprintf(
			"host=%s user=%s password=%s port=%s sslmode=disable",
			host, user, password, port,
		)
	}

	return gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
}

func InitDB() (*gorm.DB, error) {
	dbHost := "localhost"
	dbUser := "postgres"
	dbPassword := "postgres"
	dbPort := "5432"
	dbName := "legacy"

	db, err := connectDatabase(dbHost, dbUser, dbPassword, dbName, dbPort)
	if err != nil {
		// Connection failed, attempt to create the database
		defaultDb, err := connectDatabase(dbHost, dbUser, dbPassword, "", dbPort)
		if err != nil {
			return nil, fmt.Errorf("failed to connect to PostgreSQL: %v", err)
		}

		defaultDb.Exec("CREATE DATABASE " + dbName)

		// Try connecting to the new database
		db, err = connectDatabase(dbHost, dbUser, dbPassword, dbName, dbPort)
		if err != nil {
			return nil, fmt.Errorf("failed to connect to new PostgreSQL database: %v", err)
		}
	}

	if err := db.AutoMigrate(
		&model.File{},
		&model.Persona{},
		&model.SubTaskProgress{},
		&model.SubTask{},
		&model.TaskProgress{},
		&model.Task{},
		&model.UserProfile{},
		&model.User{},
	); err != nil {
		return nil, fmt.Errorf("failed to perform database auto migration: %v", err)
	}

	return db, nil
}
