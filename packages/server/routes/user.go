package routes

import (
	"gardenai/server/controllers"

	"github.com/gofiber/fiber/v2"
)

type user struct{}

var User user

func (user) Init(v1 fiber.Router) {
	// /api/v1/user
	apiv1 := v1.Group("/user")

	// body: {email: "some-email", password: "some-password"}
	apiv1.Post("/", func(c *fiber.Ctx) error {
		return controllers.User.Create(c)
	})

	// body: {email: "some-email", password: "some-password"}
	apiv1.Get("/", func(c *fiber.Ctx) error {
		return controllers.User.GetUserWithEmailAndPassword(c)
	})
}
