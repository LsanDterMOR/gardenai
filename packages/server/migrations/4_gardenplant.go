package migrations

import (
	"gardenai/server/models"
	"log"

	"gorm.io/gorm"
)

func UpGardenPlant(DB *gorm.DB) {
	if err := DB.AutoMigrate(&models.GardenPlant{}); err != nil {
		log.Fatal(err)
	}
}
