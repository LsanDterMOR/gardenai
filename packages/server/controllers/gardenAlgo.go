package controllers

import (
	"gardenai/server/database"
	"gardenai/server/models"
	"gardenai/server/validators"
	
	"fmt"
)

func CreatePlants(garden models.Garden, plantList []validators.ReqPlant, pathList []validators.ReqPath) []models.GardenPlant {
	var gardenPlantList []models.GardenPlant

	var path models.Plant
	database.DB.Model(&models.Plant{}).Find(&path, "common_name = ?", "PATH")
	for _, element := range pathList {
			gardenPlantList = append(gardenPlantList,
			models.GardenPlant {
				PosX: element.PosX,
				PosY: element.PosY,
				Size: 1,
				GardenID: garden.ID,
				Plant: path,
			})
	}

	for _, element := range plantList {
		var plant models.Plant
		database.DB.Model(&models.Plant{}).Find(&plant, "common_name = ?", element.Name)
		for  i := 0 ; i < element.Quantity; i++ {
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

func getDisponiblePlant(gardenPlantList []models.GardenPlant) []int {
	var result []int
	for i := 0 ; i < len(gardenPlantList) ; i++ {
		if gardenPlantList[i].PosX == -1 && gardenPlantList[i].PosY == -1 {
			result = append(result, i)
		}
	}
	return result
}

func SetPlantPosition(garden models.Garden, EXgardenPlantList []models.GardenPlant) []models.GardenPlant {
	setAllAssociation()

	gardenPlantList := make([]models.GardenPlant, len(EXgardenPlantList))
	copy(gardenPlantList, EXgardenPlantList)
	

	dispPlantIndex := getDisponiblePlant(gardenPlantList)
	dispPos := getDisponiblePos(garden, gardenPlantList)
	if (len(dispPlantIndex) == 0 || len(dispPos) == 0) {
		return gardenPlantList
	}
	note := 0
	currentBestNote := -1000000
	currentBestGarden := make([]models.GardenPlant, len(gardenPlantList))
	copy(currentBestGarden, gardenPlantList)

	for _,pos := range dispPos {
			gardenPlantList[dispPlantIndex[0]].PosX = pos.x
			gardenPlantList[dispPlantIndex[0]].PosY = pos.y
			note = EvaluateGarden(gardenPlantList)
			if (currentBestNote < note) { currentBestNote = note; copy(currentBestGarden, gardenPlantList)}
	}
	return SetPlantPosition(garden, currentBestGarden);
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
