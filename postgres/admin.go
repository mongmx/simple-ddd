package postgres

import (
	"database/sql"
	"fmt"
	"log"
	"strconv"

	"github.com/mongmx/match-order-echo/admin"
	"upper.io/db.v3/lib/sqlbuilder"
	"upper.io/db.v3/postgresql"
)

// NewAdminRepository creates new admin page repository
func NewAdminRepository(db *sql.DB) (admin.Repository, error) {
	pdb, err := postgresql.New(db)
	if err != nil {
		return nil, err
	}
	r := adminRepository{pdb}
	return &r, nil
}

type adminRepository struct {
	db sqlbuilder.Database
}

type supplier struct {
	ID   int64  `db:"id" json:"id"`
	Type string `db:"type" json:"type"`
	Code string `db:"code" json:"code"`
}

type product struct {
	ID     int64  `db:"id" json:"id"`
	Name   string `db:"name" json:"name"`
	Price1 string `db:"price_1" json:"price1"`
	Price2 string `db:"price_2" json:"price2"`
	Price3 string `db:"price_3" json:"price3"`
}

func (r *adminRepository) GetAllProducts() (interface{}, error) {
	var products []product
	err := r.db.SelectFrom("products").All(&products)
	if err != nil {
		fmt.Println("cannot find products in database")
		return nil, err
	}
	return products, nil
}

func (r *adminRepository) CreateProduct(x interface{}) (interface{}, error) {
	return "products", nil
}

func (r *adminRepository) GetAllSuppliers() (interface{}, error) {
	var suppliers []supplier
	err := r.db.SelectFrom("suppliers").All(&suppliers)
	if err != nil {
		fmt.Println("cannot find suppliers in database", err)
		return nil, err
	}
	return suppliers, nil
}

func (r *adminRepository) CreateSupplier(t, c string) (interface{}, error) {
	var lastInsertID *string
	err := r.db.
		InsertInto("suppliers").
		Values(map[string]interface{}{
			"type": t,
			"code": c,
		}).
		Returning("id").
		Iterator().
		ScanOne(&lastInsertID)
	if err != nil {
		log.Println(err)
		return nil, err
	}
	returnID, _ := strconv.ParseInt(*lastInsertID, 10, 64)
	return returnID, nil
}
