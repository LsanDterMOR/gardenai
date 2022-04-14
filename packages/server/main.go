package main

import (
	"gardenai/server/database"

	"github.com/gofiber/fiber/v2"
)

func main() {
	database.Setup()

	app := fiber.New()

	setRouter(app)

	app.Listen(":4000")
}
