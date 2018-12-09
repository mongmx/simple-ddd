package mock

// AdminRepository is the mock admin repository
type AdminRepository struct {
	GetAllProductsFunc    func() (interface{}, error)
	GetAllProductsInvoked bool

	CreateProductFunc    func(interface{}) (interface{}, error)
	CreateProductInvoked bool

	GetAllSuppliersFunc    func() (interface{}, error)
	GetAllSuppliersInvoked bool

	CreateSupplierFunc    func(t, c string) (interface{}, error)
	CreateSupplierInvoked bool
}

// GetAllProducts calls GetAllProductsFunc
func (repo *AdminRepository) GetAllProducts() (interface{}, error) {
	repo.GetAllProductsInvoked = true
	return repo.GetAllProductsFunc()
}

// CreateProduct calls CreateProductFunc
func (repo *AdminRepository) CreateProduct(p interface{}) (interface{}, error) {
	repo.CreateProductInvoked = true
	return repo.CreateProductFunc(p)
}

// GetAllSuppliers calls GetAllSuppliersFunc
func (repo *AdminRepository) GetAllSuppliers() (interface{}, error) {
	repo.GetAllSuppliersInvoked = true
	return repo.GetAllSuppliersFunc()
}

// CreateSupplier calls CreateSupplierFunc
func (repo *AdminRepository) CreateSupplier(t, c string) (interface{}, error) {
	repo.CreateSupplierInvoked = true
	return repo.CreateSupplierFunc(t, c)
}
