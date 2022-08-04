package validators

type gardenCreateRequest struct{}
var GardenCreateRequest gardenCreateRequest

type ReqPlant struct {
	Name            string
	Quantity        int
	Code            string
}

type GardenValidator struct {
	Name            string  `validate:"required,min=3,max=32"`
	Width           int		`validate:"required"`
	Height          int		`validate:"required"`
	UserId 			uint	`validate:"required"`
	PlantList       []ReqPlant
}



func (gardenCreateRequest) ValidateStruct(gardenCreateRequest GardenValidator) error {
	err := validate.Struct(gardenCreateRequest)
	return err
}