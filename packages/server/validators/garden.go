package validators

type garden struct{}

var Garden garden

type GardenValidator struct {
	Name            string  `validate:"required,min=3,max=32"`
	Width           int		`validate:"required"`
	Height          int		`validate:"required"`
	UserId 			uint	`validate:"required"`
}

func (garden) ValidateStruct(garden GardenValidator) error {
	err := validate.Struct(garden)
	return err
}
