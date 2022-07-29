package main

import (
	"fmt"
	"gardenai/server/routes"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
)

func main() {
	// database.Configure()

	app := fiber.New()
	api := app.Group("/api")
	v1 := api.Group("/v1")

	routes.User.Init(v1)
	routes.Plant.Init(v1)

	fmt.Println(os.Getenv("PORT"))

	log.Fatal(app.Listen(":4000"))
}
