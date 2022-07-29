package migrations

import "gorm.io/gorm"

func Run(DB *gorm.DB) {
	UpUser(DB)
	UpPlant(DB)
	UpGarden(DB)
	UpGardenPlant(DB)
}
