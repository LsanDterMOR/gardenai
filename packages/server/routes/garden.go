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

	apiv1.Get("/", func(c *fiber.Ctx) error {
		return controllers.Garden.GetAll(c)
	})
}
