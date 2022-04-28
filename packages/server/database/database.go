package database

import (
	"gardenai/server/migrations"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func connect() {
	dsn := "host=localhost user=admin password=password123 dbname=gardenai port=5432 sslmode=disable"

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
