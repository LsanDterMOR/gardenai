package controllers

import (
	"gardenai/server/database"
	"gardenai/server/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type garden struct{}

var Garden garden

func (garden) GetAll(c *fiber.Ctx) error {
	result := map[string]interface{}{}
	database.DB.Model(&models.Garden{}).First(&result)
	return c.JSON(fiber.Map{"result": result})
}

func (garden) GetById(c *fiber.Ctx) error {
	result := map[string]interface{}{}
	var param = c.Params("id")
	intVar, err := strconv.Atoi(param)
	println(intVar)
	switch err {
	default:
		database.DB.Model(&models.Garden{}).First(&result, "common_name = ?", param)
	case nil:
		database.DB.Model(&models.Garden{}).First(&result, "id = ?", param)
	}
	return c.JSON(fiber.Map{"result": result})
}

func (garden) CreateGarden(c *fiber.Ctx) error {
	/*garden := new(validators.UserValidator)

	if err := c.BodyParser(garden); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"reason":  err.Error(),
		})
	}*/
		return nil
}
