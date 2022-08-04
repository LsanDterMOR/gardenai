package migrations

import (
	"gardenai/server/models"
	"log"

	"gorm.io/gorm"
)

func UpAssociation(DB *gorm.DB) {
	if err := DB.AutoMigrate(&models.Association{}); err != nil {
		log.Fatal(err)
	}
}
