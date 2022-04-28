package validators

import "github.com/go-playground/validator/v10"

type user struct{}

var User user

type UserValidator struct {
	Email    string `validate:"required,email,min=6,max=32"`
	Password string `validate:"required,min=5,max=32"`
}

type ErrorResponse struct {
	FailedField string
	Tag         string
	Value       string
}

var validate = validator.New()

func (user) ValidateStruct(user UserValidator) error {
	err := validate.Struct(user)
	return err
}
