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

	// body: {gardenId: 245255, userId: 55253}
	apiv1.Post("/Delete", func(c *fiber.Ctx) error {
		return controllers.Garden.DeleteGarden(c)
	})
	
	// body: {name: "Garden n15", Width: 25, Height: 25, userId: 55253, plantList: []}
	apiv1.Post("/Create", func(c *fiber.Ctx) error {
		return controllers.Garden.CreateGarden(c)
	})
}
