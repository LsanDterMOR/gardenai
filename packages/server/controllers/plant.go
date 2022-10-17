package controllers

import (
	"gardenai/server/database"
	"gardenai/server/models"

	"strconv"

	"github.com/gofiber/fiber/v2"
)

type plant struct{}

var Plant plant

func (plant) GetAll(c *fiber.Ctx) error {
	result := map[string]interface{}{}
	database.DB.Model(&models.Plant{}).Find(&result)
	return c.JSON(fiber.Map{"result": result})
}

func (plant) GetOne(c *fiber.Ctx) error {
	result := map[string]interface{}{}
	println("one")
	var param = c.Params("id")
	intVar, err := strconv.Atoi(param)
	println(intVar)
	switch err {
	default:
		database.DB.Model(&models.Plant{}).First(&result, "common_name = ?", param)
	case nil:
		database.DB.Model(&models.Plant{}).First(&result, "id = ?", param)
	}
	return c.JSON(fiber.Map{"result": result})
}
