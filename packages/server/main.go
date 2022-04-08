package main

import (
	"gardenai/server/database"
	"time"
)

type User struct {
	ID        uint
	Email     *string
	CreatedAt time.Time
	UpdatedAt time.Time
}

func main() {
	setRouter()
	database.InitDatabase()
	database.DB.AutoMigrate(&User{})
}
