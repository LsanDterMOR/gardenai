package models

import (
	"gorm.io/gorm"
)

type GardenPlant struct {
	gorm.Model
	PosX            int
	PosY            int
	Size            int
	Garden          uint
	Plant           Plant `gorm:"embedded"`
}