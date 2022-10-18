package validators

type gardenCreateRequest struct{}

var GardenCreateRequest gardenCreateRequest

type gardenDeleteRequest struct{}

var GardenDeleteRequest gardenDeleteRequest

type ReqPlant struct {
	Name     string
	Quantity int
	Code     string
}

type ReqPath struct {
	PosX    	    int
	PosY	        int
}

type CreateGardenValidator struct {
	Name      string `validate:"required,min=1,max=32"`
	Width     int    `validate:"required"`
	Height    int    `validate:"required"`
	UserId    uint   `validate:"required"`
	PlantList []ReqPlant
	PathList  []ReqPath
}

type DeleteGardenValidator struct {
	UserId   uint `validate:"required"`
	GardenId uint `validate:"required"`
}

func (gardenCreateRequest) ValidateStruct(gardenCreateRequest CreateGardenValidator) error {
	err := validate.Struct(gardenCreateRequest)
	return err
}

func (gardenDeleteRequest) ValidateStruct(gardenDeleteRequest DeleteGardenValidator) error {
	err := validate.Struct(gardenDeleteRequest)
	return err
}
