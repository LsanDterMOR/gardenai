package routes

import (
	"gardenai/server/controllers"

	"github.com/gofiber/fiber/v2"
)

type garden struct{}

var Garden garden

func (garden) Init(v1 fiber.Router) {
	// /api/v1/garden
	apiv1 := v1.Group("/garden")

	apiv1.Get("/GetAll/:id", func(c *fiber.Ctx) error {
		return controllers.Garden.GetAll(c)
	})

	apiv1.Get("/GetById/:id", func(c *fiber.Ctx) error {
		return controllers.Garden.GetById(c)
	})

	// body: {name: "Garden n15", Width: 50, Height: 50}
	apiv1.Post("/Create", func(c *fiber.Ctx) error {
		return controllers.Garden.CreateGarden(c)
	})
}
