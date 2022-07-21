package migrations

import (
	"gardenai/server/models"
	"log"

	"gorm.io/gorm"
)

func UpPlant(DB *gorm.DB) {
	if err := DB.AutoMigrate(&models.Plant{}); err != nil {
		log.Fatal(err)
	}
}
