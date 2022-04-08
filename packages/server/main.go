package main

import (
	"gardenai/server/database"
	"time"

	"github.com/gofiber/fiber/v2"
)

type User struct {
	ID        uint
	Email     *string
	Password  string
	PasswordVerification string
	CreatedAt time.Time
	UpdatedAt time.Time
}

func main() {
	app := fiber.New()

	setRouter(app)

	app.Listen(":4000")
	database.InitDatabase()
	database.DB.AutoMigrate(&User{})
}
