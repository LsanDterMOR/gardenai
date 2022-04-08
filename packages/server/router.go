package main

import (
	"github.com/gofiber/fiber/v2"
)

func setRouter(app *fiber.App) {

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "Hello World"})
	})
	app.Post("/user", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "Hello World"})
	})

	app.Listen(":4000")
}
