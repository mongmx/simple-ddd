package customer

// Service is the auth service
type Service interface {
}

type service struct {
	repo Repository
}

// NewService creates new admin service
func NewService(repo Repository) (Service, error) {
	s := service{repo}
	return &s, nil
}
