package controllers

import (
	"gardenai/server/database"
	"gardenai/server/models"
)

var AllAssociation []models.Association

func setAllAssociation() {
	database.DB.Preload("Plant1").Preload("Plant2").Model(&models.Association{}).Find(&AllAssociation)
}

func getPlantAtPos(gardenPlantList []models.GardenPlant, x int, y int) models.GardenPlant {
	for i := 0 ; i < len(gardenPlantList) ; i++ {
		if gardenPlantList[i].PosX == x && gardenPlantList[i].PosY == y {
			return gardenPlantList[i]
		}
	}
	return models.GardenPlant{}
}

func getScore(gardenPlant1 models.GardenPlant, gardenPlant2 models.GardenPlant) int {
	for _, elem := range AllAssociation {
		if (gardenPlant2.Plant.ID == uint(elem.Plant1ID) && gardenPlant1.Plant.ID  == uint(elem.Plant2ID) ||
			gardenPlant2.Plant.ID == uint(elem.Plant2ID) && gardenPlant1.Plant.ID  == uint(elem.Plant1ID)) {
				return elem.Note
			}
	}
	return 0
}

func EvaluateGarden(gardenPlantList []models.GardenPlant) int {
	note := 0
	for i := 0 ; i < len(gardenPlantList) ; i++ {
		note += getScore(getPlantAtPos(gardenPlantList, gardenPlantList[i].PosX + 1, gardenPlantList[i].PosX + 1),
		gardenPlantList[i])
		note += getScore(getPlantAtPos(gardenPlantList, gardenPlantList[i].PosX + 1, gardenPlantList[i].PosX - 1),
		gardenPlantList[i])
		note += getScore(getPlantAtPos(gardenPlantList, gardenPlantList[i].PosX - 1, gardenPlantList[i].PosX - 1),
		gardenPlantList[i])
		note += getScore(getPlantAtPos(gardenPlantList, gardenPlantList[i].PosX - 1, gardenPlantList[i].PosX + 1),
		gardenPlantList[i])
	}
	return note
}

func SetPlantScore(gardenPlantList []models.GardenPlant) {
	note := 0
	for i, element := range gardenPlantList {
		note += getScore(getPlantAtPos(gardenPlantList, gardenPlantList[i].PosX + 1, gardenPlantList[i].PosX + 1),
		gardenPlantList[i])
		note += getScore(getPlantAtPos(gardenPlantList, gardenPlantList[i].PosX + 1, gardenPlantList[i].PosX - 1),
		gardenPlantList[i])
		note += getScore(getPlantAtPos(gardenPlantList, gardenPlantList[i].PosX - 1, gardenPlantList[i].PosX - 1),
		gardenPlantList[i])
		note += getScore(getPlantAtPos(gardenPlantList, gardenPlantList[i].PosX - 1, gardenPlantList[i].PosX + 1),
		gardenPlantList[i])

		element.Score = note;
		note = 0
	}
}