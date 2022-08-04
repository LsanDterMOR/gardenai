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

// GetAll godoc
// @Summary      Show all garden
// @Description  Get all garden by user ID
// @Tags         garden
// @Accept       json
// @Produce      json
// @Param        id   path      int  true  "Account ID"
// @Success      200  {array}  	garden
// @Failure      400  {object}  error
// @Failure      404  {object}  error
// @Failure      500  {object}  error
// @Router       /GetAll/{id} [get]
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

// GetById godoc
// @Summary      Show garden
// @Description  Get garden by ID
// @Tags         garden
// @Accept       json
// @Produce      json
// @Param        id   path      int  true  "Garden ID"
// @Success      200  {object}  garden
// @Failure      400  {object}  error
// @Failure      404  {object}  error
// @Failure      500  {object}  error
// @Router       /GetById/{id} [get]
func (garden) GetById(c *fiber.Ctx) error {
	result := models.GardenResult{}

	if err := database.DB.Model(&models.Garden{}).First(&result, "id = ?", c.Params("id")).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"reason":  err.Error(),
		})
	}

	if err := database.DB.Preload("Plant").Model(&models.GardenPlant{}).Find(&result.PlantList, "garden_id = ?", c.Params("id")).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"reason":  err.Error(),
		})
	}

	return c.JSON(fiber.Map{"result": result})
}

// CreateGarden godoc
// @Summary      Create a garden
// @Description  Create a garden with data
// @Tags         garden
// @Accept       json
// @Produce      json
// @Param        object   path    	object  true  "Garden JSON"
// @Success      200  {object}  garden
// @Failure      400  {object}  error
// @Failure      404  {object}  error
// @Failure      500  {object}  error
// @Router       /CreateGarden/ [post]
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