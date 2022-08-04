package models

import (
	"gorm.io/gorm"
)

type Association struct {
	gorm.Model
	Plant1      string
	Plant2 	    string
	Note        int
}