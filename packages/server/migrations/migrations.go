package migrations

import "gorm.io/gorm"

func Run(DB *gorm.DB) {
	UpUser(DB)
}
