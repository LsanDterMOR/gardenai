package controllers

import (
	"gardenai/server/database"
	"gardenai/server/models"

	"github.com/gofiber/fiber/v2"
)

type plant struct{}

var Plant plant

func (plant) GetAll(c *fiber.Ctx) error {
	result := map[string]interface{}{}

	database.DB.Model(&models.Plant{}).First(&result)
	return c.JSON(fiber.Map{"result": result})
}
