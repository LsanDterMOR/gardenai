package models

import (
	"gorm.io/gorm"
)

type ReqPlant struct {
	Name            string
	Quantity        int
	Code            int
}

type GardenCreateRequest struct {
	gorm.Model
	Name            string
	Width           int
	Height          int
	UserId          uint
	PlantList       []ReqPlant
}