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
	result := database.DB.Find(&Garden)
	println("all")
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
	/*garden := Garden{Id: 10, Name: "ahaha", Width: 15, Height: 15}

result := database.DB.Create(&garden) // pass pointer of data to Create

user.ID             // returns inserted data's primary key
result.Error        // returns error
result.RowsAffected // returns inserted records count

type Garden struct {
	gorm.Model
	Id              uint `gorm:"uniqueIndex"`
	Name            *string
	Width           int
	Height          int
	Paths           Position `gorm:"embedded"`
	VectorPositions VectorPosition `gorm:"embedded"`
	PlantList       int
}*/
	return nil
}
