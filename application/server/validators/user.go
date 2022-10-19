package validators

type user struct{}

var User user

type UserValidator struct {
	Email    string `validate:"required,email,min=6,max=32"`
	Password string `validate:"required,min=5,max=32"`
}

func (user) ValidateStruct(user UserValidator) error {
	err := validate.Struct(user)
	return err
}
