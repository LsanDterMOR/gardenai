package controllers

import (
	"gardenai/server/database"
	"gardenai/server/models"

	"github.com/gofiber/fiber/v2"
)

type garden struct{}

var Garden garden

func (garden) GetAll(c *fiber.Ctx) error {
	result := map[string]interface{}{}
	database.DB.Model(&models.Garden{}).Find(&result)
	return c.JSON(fiber.Map{"result": result})
}

func (garden) test(c *fiber.Ctx) error {
	result := map[string]interface{}{}
	database.DB.Model(&models.Garden{Id: 2}).Select(&result)
	return c.JSON(fiber.Map{"result": result})
}
