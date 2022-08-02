package controllers

import (
	"gardenai/server/database"
	"gardenai/server/models"
	"gardenai/server/validators"

	"fmt"
)

func CreatePlants(garden models.Garden, plantList []validators.ReqPlant) []models.GardenPlant {
	var gardenPlantList []models.GardenPlant

	for _, element := range plantList {
		for  i := 0 ; i < element.Quantity; i++ {
			var plant models.Plant
			database.DB.Model(&models.Plant{}).Find(&plant, "common_name = ?", element.Name)
			
			gardenPlantList = append(gardenPlantList,
				models.GardenPlant {
					PosX: -1,
					PosY: -1,
					Size: 1,
					GardenID: garden.ID,
					Plant: plant,
				})
		}
	}

	return SetPlantPosition(garden, gardenPlantList)
}
func IsPlacedPlant(gardenPlant models.GardenPlant) bool {
	if (gardenPlant.PosX == -1 && gardenPlant.PosY == -1) {
		return false
	}
	return true
}

type Position struct {
	x int
	y int
}

func IsPosFull(gardenPlantList []models.GardenPlant, position Position) bool {
	for i := 0 ; i < len(gardenPlantList) ; i++ {
		if gardenPlantList[i].PosX == position.x && gardenPlantList[i].PosY == position.y {
			return true
		}
	}
	return false
}

func IsPosFullxy(gardenPlantList []models.GardenPlant, x int, y int) bool {
	for i := 0 ; i < len(gardenPlantList) ; i++ {
		if gardenPlantList[i].PosX == x && gardenPlantList[i].PosY == y {
			return true
		}
	}
	return false
}

func getDisponiblePos(garden models.Garden, gardenPlantList []models.GardenPlant) []Position {
	var dispoPosList []Position
	for X := 0 ; X < garden.Width ; X++ {
		for Y := 0 ; Y < garden.Height ; Y++ {
			if !IsPosFullxy(gardenPlantList, X, Y) {
				dispoPosList = append(dispoPosList, Position{X, Y})
			}
		}
	}
	return dispoPosList
}

func SetPlantPosition(garden models.Garden, gardenPlantList []models.GardenPlant) []models.GardenPlant {

	for i := 0 ; i < len(gardenPlantList) ; i++ {
		for _,pos := range getDisponiblePos(garden, gardenPlantList) {
			if !IsPlacedPlant(gardenPlantList[i]) {
				gardenPlantList[i].PosX = pos.x
				gardenPlantList[i].PosY = pos.y
				SetPlantPosition(garden, gardenPlantList);
			}
		}
	}
	gardenPlantList = SetPlantBasicPosition(garden, gardenPlantList)
	return gardenPlantList
}

func SetPlantBasicPosition(garden models.Garden, gardenPlantList []models.GardenPlant) []models.GardenPlant {
	fmt.Println("BasicPos")
	for X, Y, i := 0, 0, 0 ; i < len(gardenPlantList) ; i++ {
		gardenPlantList[i].PosX = X;
		gardenPlantList[i].PosY = Y;
		if X + 1 < garden.Width { X++ } else { X = 0; Y++ }
	}
	return gardenPlantList
}
