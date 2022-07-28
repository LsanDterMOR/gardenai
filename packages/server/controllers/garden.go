package controllers

import (
	"gardenai/server/database"
	"gardenai/server/models"
	"strconv"

	gonanoid "github.com/matoous/go-nanoid/v2"
	"github.com/gofiber/fiber/v2"
)

type garden struct{}

var Garden garden

func (garden) GetAll(c *fiber.Ctx) error {
	var result []models.Garden
	database.DB.Model(&models.Garden{}).Find(&result)
	return c.JSON(fiber.Map{"result": result})
}

func (garden) GetById(c *fiber.Ctx) error {
	result := map[string]interface{}{}
	param := c.Params("id")
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
	gardenReq := models.GardenRequest{}
	if err := c.BodyParser(gardenReq); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"reason":  err.Error(),
		})
	}

	// function algo

	dbGarden := models.Garden{
		Name: gardenReq.Name,
		Width: gardenReq.Width,
		Height: gardenReq.Height,
	}

	id, err := gonanoid.Generate("0123456789", 9)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"reason":  "Couldn't generate id"})
	} else {
		u64, err := strconv.ParseUint(id, 10, 32)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"success": false,
				"reason":  "Couldn't parse id"})
		}
		dbGarden.ID = uint(u64)
	}

	if err := database.DB.Create(&dbGarden).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success":   false,
			"reason":    "Couldn't create garden",
			"db.reason": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"result":  dbGarden.ID,
	})
}
