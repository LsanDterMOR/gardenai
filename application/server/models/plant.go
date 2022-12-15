package models

import (
	"gorm.io/gorm"
)

type GrowthRate uint
type SunExposure uint
type RootType uint

const (
	Slow   GrowthRate = iota + 1 // EnumIndex = 1
	Medium                       // EnumIndex = 2
	Fast                         // EnumIndex = 3
)

const (
	Shade SunExposure = iota + 1
	PartialShade
	FullSun
)

type Plant struct {
	gorm.Model
	CommonName       *string
	ScientificName   string
	PlantType        string
	PlantCategory    string
	MaxHeight        uint
	GrowthRate       GrowthRate
	SunExposure      SunExposure
	MinimumRootDepth uint
	MinpH            uint
	MaxpH            uint
}
