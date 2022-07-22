package models

import (
	"gorm.io/gorm"
)

type VectorPosition struct {
    X int
    Y int
    A int
    B int
}

type Position struct {
    X int
    Y int
}

type Garden struct {
	gorm.Model
	Name       *string
	Width		int
	Height		int
	Paths		[]Position
	VectorPositions []VectorPosition
	PlantsId	[]int
}
