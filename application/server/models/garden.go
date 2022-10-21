package models

import (
	"gorm.io/gorm"
)

type Garden struct {
	gorm.Model
	Name            string
	Width           int
	Height          int
	UserId          uint
}