package controllers

import (
	"gardenai/server/models"
)

func getPlantAtPos(gardenPlantList []models.GardenPlant, x int, y int) models.GardenPlant {
	for i := 0 ; i < len(gardenPlantList) ; i++ {
		if gardenPlantList[i].PosX == x && gardenPlantList[i].PosY == y {
			return gardenPlantList[i]
		}
	}
	return nil
}

func getScore(gardenPlantList models.GardenPlant, gardenPlant models.GardenPlant) int {
	return 5
}

func EvaluateGarden(gardenPlantList []models.GardenPlant) int {
	note := 0
	for i := 0 ; i < len(gardenPlantList) ; i++ {
		note += getScore(getPlantAtPos(gardenPlantList, gardenPlantList[i].PosX + 1, gardenPlantList[i].PosX + 1),
		gardenPlantList[i]) // Up plant
		note += getScore(getPlantAtPos(gardenPlantList, gardenPlantList[i].PosX + 1, gardenPlantList[i].PosX - 1),
		gardenPlantList[i]) // Down plant
		note += getScore(getPlantAtPos(gardenPlantList, gardenPlantList[i].PosX - 1, gardenPlantList[i].PosX - 1),
		gardenPlantList[i]) // Left plant
		note += getScore(getPlantAtPos(gardenPlantList, gardenPlantList[i].PosX - 1, gardenPlantList[i].PosX + 1),
		gardenPlantList[i]) // Right plant
	}
	return note
}