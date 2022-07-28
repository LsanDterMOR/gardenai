package database

import (
	"gardenai/server/migrations"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func getDBHost() string {
	devStage := os.Getenv("DEV_STAGE")
	var env string

	switch devStage {
	case "docker":
		env = "gardenai-db"
	default:
		env = "localhost"
	}

	return env
}

func connect() {
	host := getDBHost()

	dsn := "host=" + host + " user=postgres password=password123 dbname=gardenai port=5432"

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
