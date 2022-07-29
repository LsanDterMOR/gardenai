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
	result := models.GardenResult{}
	param := c.Params("id")
	intVar, err := strconv.Atoi(param)
	println(intVar)
	switch err {
	default:
		database.DB.Model(&models.Garden{}).First(&result, "name = ?", param)
	case nil:
		database.DB.Model(&models.Garden{}).First(&result, "id = ?", param)
	}

	database.DB.Model(&models.GardenPlant{}).Find(&result.PlantList, "garden = ?", param)

	return c.JSON(fiber.Map{"result": result})
}

func (garden) CreateGarden(c *fiber.Ctx) error {
	/*garden := models.Garden{}
	if err := c.BodyParser(garden); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"reason":  err.Error(),
		})
	}*/

	// function algo

	dbGarden := models.Garden{
		Name: "garden.Name",
		Width: 15,
		Height: 15,
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

	dbGardenPlant := models.GardenPlant{
		PosX: 0,
		PosY: 2,
		Size: 1,
		Garden: dbGarden.ID,
	}

	dbGardenPlant2 := models.GardenPlant{
		PosX: 1,
		PosY: 3,
		Size: 1,
		Garden: dbGarden.ID,
	}

	if err := database.DB.Create(&dbGarden).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success":   false,
			"reason":    "Couldn't create garden",
			"db.reason": err.Error(),
		})
	}

	if err := database.DB.Create(&dbGardenPlant).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success":   false,
			"reason":    "Couldn't create gardenPlant",
			"db.reason": err.Error(),
		})
	}

	if err := database.DB.Create(&dbGardenPlant2).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success":   false,
			"reason":    "Couldn't create gardenPlant",
			"db.reason": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"result":  dbGarden.ID,
	})
}
