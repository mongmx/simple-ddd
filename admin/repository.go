package admin

// Product domain model
type Product struct {
	ID int64 `json:"id"`
}

// Supplier domain model
type Supplier struct {
	ID int64 `json:"id"`
}

// Repository is the admin storage
type Repository interface {
	GetAllProducts() (interface{}, error)
	CreateProduct(interface{}) (interface{}, error)
	GetAllSuppliers() (interface{}, error)
	CreateSupplier(t, c string) (interface{}, error)
}
