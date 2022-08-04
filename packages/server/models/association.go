package models

import (
	"gorm.io/gorm"
)

type Association struct {
	gorm.Model
	Plant2      string
	Plant1 	    string
	note        int
}
