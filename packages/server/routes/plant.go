package routes

import (
	"gardenai/server/controllers"

	"github.com/gofiber/fiber/v2"
)

type plant struct{}

var Plant plant

func (plant) Init(v1 fiber.Router) {
	// /api/v1/plant
	apiv1 := v1.Group("/plant")

	apiv1.Get("/", func(c *fiber.Ctx) error {
		return controllers.Plant.GetAll(c)
	})
}
