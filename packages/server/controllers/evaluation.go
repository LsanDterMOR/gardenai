package controllers

import (
	"gardenai/server/database"
	"gardenai/server/models"
)

func getPlantAtPos(gardenPlantList []models.GardenPlant, x int, y int) models.GardenPlant {
	for i := 0 ; i < len(gardenPlantList) ; i++ {
		if gardenPlantList[i].PosX == x && gardenPlantList[i].PosY == y {
			return gardenPlantList[i]
		}
	}
	return models.GardenPlant{}
}

func getScore(gardenPlant1 models.GardenPlant, gardenPlant2 models.GardenPlant) int {
	if (gardenPlant1.Plant.ID == 0 || gardenPlant2.Plant.ID == 0) { return 0 }
	
	result := models.Association{}
	
	database.DB.Preload("Plant1").Preload("Plant2").Model(&models.Association{}).
	Where("plant1_id = ? AND plant2_id = ?", gardenPlant1.Plant.ID, gardenPlant2.Plant.ID).
	Or("plant1_id = ? AND plant2_id = ?", gardenPlant2.Plant.ID, gardenPlant1.Plant.ID).
	First(&result)

	return result.Note
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