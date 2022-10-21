package models

import (
	"gorm.io/gorm"
)

type GardenResult struct {
	gorm.Model
	Name            string
	Width           int
	Height          int
	PlantList       []GardenPlant `gorm:"foreignKey:GardenID"`
	Path       		[]GardenPlant `gorm:"foreignKey:GardenID"`
}