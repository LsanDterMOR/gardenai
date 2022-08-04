package database

import (
	"fmt"
	"gardenai/server/migrations"
	"gardenai/server/utilities"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

type dbVars struct {
	host     string
	user     string
	password string
	dbname   string
	port     string
}

func getDbVars() dbVars {
	return dbVars{
		host:     utilities.GetEnv("DB_HOST", "localhost"),
		user:     utilities.GetEnv("DB_USER", "postgres"),
		password: utilities.GetEnv("DB_PASSWORD", "password123"),
		dbname:   utilities.GetEnv("DB_NAME", "gardenai"),
		port:     utilities.GetEnv("DB_PORT", "5432"),
	}
}

func connect() {
	vars := getDbVars()
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s", vars.host, vars.user, vars.password, vars.dbname, vars.port)

	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  dsn,
		PreferSimpleProtocol: true,
	}), &gorm.Config{})

	if err != nil {
		log.Fatal(err)
	}

	DB = db
}

func Configure() {
	connect()
	migrations.Run(DB)
}
