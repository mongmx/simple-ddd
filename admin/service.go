package admin

// Service is the auth service
type Service interface {
	GetAllProducts() (interface{}, error)
	CreateProduct(interface{}) (interface{}, error)
	GetAllSuppliers() (interface{}, error)
	CreateSupplier(t, c string) (interface{}, error)
}

type service struct {
	repo Repository
}

// NewService creates new admin service
func NewService(repo Repository) (Service, error) {
	s := service{repo}
	return &s, nil
}

func (s *service) GetAllProducts() (interface{}, error) {
	res, err := s.repo.GetAllProducts()
	if err != nil {
		return []Product{}, err
	}
	return res, nil
}

func (s *service) CreateProduct(interface{}) (interface{}, error) {
	return nil, nil
}

func (s *service) GetAllSuppliers() (interface{}, error) {
	res, err := s.repo.GetAllSuppliers()
	if err != nil {
		return []Supplier{}, err
	}
	return res, nil
}

func (s *service) CreateSupplier(t, c string) (interface{}, error) {
	res, err := s.repo.CreateSupplier(t, c)
	if err != nil {
		return nil, err
	}
	return res, nil
}
