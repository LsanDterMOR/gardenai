package main

import (
	"gardenai/server/database"
	"gardenai/server/routes"
	"gardenai/server/utilities"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
)

// @title           Gardenai Backend
// @version         1.0
// @description     This is the server of the Gardenai project.
// @termsOfService  http://swagger.io/terms/

// @host      https://gardenai-backend.herokuapp.com/
// @BasePath  /api/v1

// @securityDefinitions.basic  BasicAuth

func main() {
	database.Configure()

	app := fiber.New()
	api := app.Group("/api")
	version := api.Group("/v1")

	routes.User.Init(version)
	routes.Plant.Init(version)
	routes.Garden.Init(version)

	port := utilities.GetEnv("PORT", "4000")

	app.Get("/swagger/*", swagger.New(swagger.Config{ // custom
		URL:         "http://example.com/doc.json",
		DeepLinking: false,
		// Expand ("list") or Collapse ("none") tag groups by default
		DocExpansion: "none",
		// Prefill OAuth ClientId on Authorize popup
		OAuth: &swagger.OAuthConfig{
			AppName:  "OAuth Provider",
			ClientId: "21bb4edc-05a7-4afc-86f1-2e151e4ba6e2",
		},
		// Ability to change OAuth2 redirect uri location
		OAuth2RedirectUrl: "http://localhost:8080/swagger/oauth2-redirect.html",
	}))

	app.Listen(":8080")

	log.Fatal(app.Listen(":" + port))
}
