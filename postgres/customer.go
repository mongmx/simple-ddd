package postgres

import (
	"database/sql"

	"github.com/mongmx/match-order-echo/customer"
	"upper.io/db.v3/lib/sqlbuilder"
	"upper.io/db.v3/postgresql"
)

// NewCustomerRepository creates new customer page repository
func NewCustomerRepository(db *sql.DB) (customer.Repository, error) {
	pdb, err := postgresql.New(db)
	if err != nil {
		return nil, err
	}
	r := customerRepository{pdb}
	return &r, nil
}

type customerRepository struct {
	db sqlbuilder.Database
}
