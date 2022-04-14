package migrations

import (
	"gardenai/server/models"

	"gorm.io/gorm"
)

func UpUser(DB *gorm.DB) {
	if err := DB.AutoMigrate(&models.User{}); err != nil {
		panic(err)
	}
}
