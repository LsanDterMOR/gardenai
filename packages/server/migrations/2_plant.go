package migrations

import (
	"gardenai/server/models"

	"gorm.io/gorm"
)

func UpPlant(DB *gorm.DB) {
	if err := DB.AutoMigrate(&models.Plant{}); err != nil {
		panic(err)
	}
}
