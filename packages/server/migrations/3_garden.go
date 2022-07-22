package migrations

import (
	"gardenai/server/models"
	"log"

	"gorm.io/gorm"
)

func UpGarden(DB *gorm.DB) {
	if err := DB.AutoMigrate(&models.Garden{}); err != nil {
		log.Fatal(err)
	}
}