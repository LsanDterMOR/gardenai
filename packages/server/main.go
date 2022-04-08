package main

import (
	"gardenai/server/database"
	"time"

	"github.com/gofiber/fiber/v2"
)

type User struct {
	ID        uint
	Email     *string
	CreatedAt time.Time
	UpdatedAt time.Time
}

func main() {
	app := fiber.New()

	database.InitDatabase()
	database.DB.AutoMigrate(&User{})

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "Hello World"})
	})

	app.Listen(":4000")
}
