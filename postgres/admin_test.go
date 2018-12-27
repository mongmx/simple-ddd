package postgres_test

import (
	"database/sql"
	"fmt"
	"log"
	"testing"

	"github.com/mongmx/match-order-echo/postgres"
	"github.com/stretchr/testify/assert"
)

const (
	dbPort   = "5432"
	dbHost   = "domain"
	dbUser   = "user"
	dbPass   = "pass"
	dbName   = "db"
	sslMode  = "disable"
	clientID = 0
)

var conn string
var db *sql.DB
var actual string

func connectDB() *sql.DB {
	conn = fmt.Sprintf("dbname=%s user=%s password=%s host =%s port=%s sslmode=%s ", dbName, dbUser, dbPass, dbHost, dbPort, sslMode)
	//fmt.Println("conn -> ", conn)
	var err error
	db, err = sql.Open("postgres", conn)
	if err != nil {
		log.Println("Error on sql.Open:", err)
	}
	return db
}

func TestAdminRepo_GetAllProducts(t *testing.T) {
	fmt.Println("test #1 : TestAdminRepo_GetAllProducts")

	expect := "Admin"

	db := connectDB()
	defer db.Close()

	x, err := postgres.NewAdminRepository(db)
	if err != nil {
		t.Fatalf("error postgres.NewAdminRepository.. %s", err.Error())
	}

	rs, err := x.GetAllProducts()
	if err != nil {
		fmt.Println("err ", err.Error())
	}
	var actual interface{}
	if rs != nil {
		actual = rs
	}

	assert.Equal(t, expect, actual, "error")
}
