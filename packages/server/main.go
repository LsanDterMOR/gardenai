package main

import (
	"gardenai/server/routes"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
)

func getEnv(key string, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func main() {
	// database.Configure()

	app := fiber.New()
	api := app.Group("/api")
	v1 := api.Group("/v1")

	routes.User.Init(v1)
	routes.Plant.Init(v1)

	port := getEnv("PORT", "4000")

	log.Fatal(app.Listen(":" + port))
}
