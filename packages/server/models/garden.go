package models

import (
	"gorm.io/gorm"
)

type Garden struct {
	gorm.Model
	Id       uint	`gorm:"uniqueIndex"`
	Name     string
	Password string
}
