package models

import (
	"gorm.io/gorm"
)

type VectorPosition struct {
    x int
    y int
    a int
    b int
}

type Position struct {
    x int
    y int
}

type Garden struct {
	gorm.Model
	Id              uint `gorm:"uniqueIndex"`
	Name            *string
	Width           int
	Height          int
	Paths           Position `gorm:"embedded"`
	VectorPositions VectorPosition `gorm:"embedded"`
	PlantList       int
}
