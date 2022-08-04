package main

import (
	"gardenai/server/database"
	"gardenai/server/routes"
	"gardenai/server/utilities"
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	database.Configure()

	app := fiber.New()
	api := app.Group("/api")
	version := api.Group("/v1")

	routes.User.Init(version)
	routes.Plant.Init(version)
	routes.Garden.Init(version)

	port := utilities.GetEnv("PORT", "4000")

	log.Fatal(app.Listen(":" + port))
}
