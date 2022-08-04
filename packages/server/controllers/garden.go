package controllers

import (
	"gardenai/server/database"
	"gardenai/server/models"
	"gardenai/server/validators"
	"strconv"

	gonanoid "github.com/matoous/go-nanoid/v2"
	"github.com/gofiber/fiber/v2"
)

type garden struct{}

var Garden garden

func (garden) GetAll(c *fiber.Ctx) error {
	var result []models.Garden

	if err := database.DB.Model(&models.Garden{}).Find(&result, "user_id = ?", c.Params("id")).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"reason":  err.Error(),
		})
	}

	return c.JSON(fiber.Map{"result": result})
}

func (garden) GetById(c *fiber.Ctx) error {
	result := models.GardenResult{}

	if err := database.DB.Model(&models.Garden{}).First(&result, "id = ?", c.Params("id")).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"reason":  err.Error(),
		})
	}

	database.DB.Model(&models.GardenPlant{}).Find(&result.PlantList, "garden_id = ?", c.Params("id"))

	return c.JSON(fiber.Map{"result": result})
}

func (garden) CreateGarden(c *fiber.Ctx) error {
	garden := new(validators.GardenValidator)

	if err := c.BodyParser(garden); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"reason":  err.Error(),
		})
	}

	err := validators.GardenCreateRequest.ValidateStruct(*garden)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"reason":  err.Error(),
		})
	}

	dbGarden := models.Garden{
		Name: garden.Name,
		Width: garden.Width,
		Height: garden.Height,
		UserId: garden.UserId,
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

	for _, element := range CreatePlants(dbGarden, garden.PlantList) {
		dbGardenPlant := element

		if err := database.DB.Create(&dbGardenPlant).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"success":   false,
				"reason":    "Couldn't create gardenPlant",
				"db.reason": err.Error(),
			})
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"result":  dbGarden.ID,
	})
}