package models

import (
	"gorm.io/gorm"
)

type GardenRequest struct {
	gorm.Model
	Name            string	`gorm:"required"`
	Width           int		`gorm:"required"`
	Height          int		`gorm:"required"`
	PlantList       int
}
