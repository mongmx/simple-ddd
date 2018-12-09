package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/mongmx/match-order-echo/admin"
	"github.com/mongmx/match-order-echo/customer"
	"github.com/mongmx/match-order-echo/postgres"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

var (
	env     = "development"
	sslMode = "disable"
	dbPort  = "5432"
	dbHost  = "localhost"
	dbUser  = "root"
	dbPass  = "root"
	dbName  = "talad"
)

func main() {
	conn := fmt.Sprintf(
		"dbname=%s user=%s password=%s host=%s port=%s sslmode=%s",
		dbName, dbUser, dbPass, dbHost, dbPort, sslMode,
	)
	db, err := sql.Open("postgres", conn)
	must(err)
	defer db.Close()

	e := setupRouter(db)
	e.Logger.Fatal(e.Start(":8080"))
}

func setupRouter(db *sql.DB) *echo.Echo {

	adminRepo, err := postgres.NewAdminRepository(db)
	must(err)
	adminService, err := admin.NewService(adminRepo)
	must(err)

	customerRepo, err := postgres.NewCustomerRepository(db)
	must(err)
	customerService, err := customer.NewService(customerRepo)
	must(err)

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{
			http.MethodGet,
			http.MethodHead,
			http.MethodOptions,
			http.MethodPut,
			http.MethodPatch,
			http.MethodPost,
			http.MethodDelete,
		},
	}))

	e.Static("/assets", "./page/assets/dist")
	e.File("/", "page/assets/dist/index.html")

	admin.Routes(e, adminService)
	customer.Routes(e, customerService)
	// delivery.Routes(e, deliveryService)
	// purchase.Routes(e, purchaseService)

	return e
}

func must(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
