package models

import "time"

type GrowthRate uint
type SunExposure uint
type RootType uint

const (
	Slow   GrowthRate = iota + 1 // EnumIndex = 1
	Medium                       // EnumIndex = 2
	Fast                         // EnumIndex = 3
)

const (
	FullSun SunExposure = iota + 1
	PartialShade
	Shade
)

const (
	FibrousDeep	RootType = iota + 1
	FibrousShallow 
)

type Plant struct {
	ID               uint
	CommonName       *string
	ScientificName   string
	PlantType        string
	PlantCategory    string
	MinHeight        uint
	MaxHeight        uint
	MinSpreadRoot    uint
	MaxSpreadRoot    uint
	GrowthRate       GrowthRate
	SunExposure      SunExposure
	MinimumRootDepth uint
	MinpH            uint
	MaxpH            uint
	MinUSDAZone      uint
	MaxUSDAZone      uint
	RootType 		 RootType
	CreatedAt        time.Time
	UpdatedAt        time.Time
}
