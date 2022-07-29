package main

import (
	"gardenai/server/routes"
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	// database.Configure()

	app := fiber.New()
	api := app.Group("/api")
	v1 := api.Group("/v1")

	routes.User.Init(v1)
	routes.Plant.Init(v1)

	log.Fatal(app.Listen(":4000"))
}
