package models

import (
	"gorm.io/gorm"
)

type GardenPlant struct {
	gorm.Model
	PosX            int
	PosY            int
	Size            int
	GardenID        uint
	Plant           Plant `gorm:"embedded"`
}