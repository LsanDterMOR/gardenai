package models

import (
	"gorm.io/gorm"
)

type GardenPlant struct {
	gorm.Model
	PosX            int
	PosY            int
	Size            int
	Score           int
	GardenID        uint
	PlantID         int
	Plant           Plant
}