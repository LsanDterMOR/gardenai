package controllers

import (
	"gardenai/server/database"
	"gardenai/server/models"

	"strconv"

	"github.com/gofiber/fiber/v2"
)

type plant struct{}

var Plant plant

// GetAll godoc
// @Summary      Get all plants
// @Description  Get all plants
// @Tags         plant
// @Accept       json
// @Produce      json
// @Param        object   path    	object  true  "Plant JSON"
// @Success      200  {array}  plant
// @Failure      400  {object}  error
// @Failure      404  {object}  error
// @Failure      500  {object}  error
// @Router       /plant [get]
func (plant) GetAll(c *fiber.Ctx) error {
	result := map[string]interface{}{}
	println("all")
	database.DB.Model(&models.Plant{}).First(&result)
	return c.JSON(fiber.Map{"result": result})
}

// GetOne godoc
// @Summary      Get one plant
// @Description  Get one plant by ID
// @Tags         plant
// @Accept       json
// @Produce      json
// @Param        object   path    	object  true  "Plant JSON"
// @Success      200  {array}  plant
// @Failure      400  {object}  error
// @Failure      404  {object}  error
// @Failure      500  {object}  error
// @Router       /plant/{id} [get]
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
