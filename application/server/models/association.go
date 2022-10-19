package models

import (
	"gorm.io/gorm"
)

type Association struct {
	gorm.Model
	Plant1ID      int
	Plant1      Plant
	Plant2ID      int
	Plant2      Plant
	Note          int
}