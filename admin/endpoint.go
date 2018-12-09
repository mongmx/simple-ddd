package admin

import (
	"log"
	"net/http"

	"github.com/labstack/echo"
)

func authEndpoint(c echo.Context) error {
	type response struct {
		Result string `json:"result"`
		Token  string `json:"token"`
	}

	c.JSON(200,
		&response{
			Result: "success",
			Token:  "1234567890",
		},
	)

	return nil
}

func productListEndpoint(c echo.Context) error {
	type response struct {
		Result   string      `json:"result"`
		Products interface{} `json:"products"`
	}

	products, err := s.GetAllProducts()
	if err != nil {
		c.JSON(500, err)
		return err
	}

	c.JSON(200,
		&response{
			Result:   "success",
			Products: products,
		},
	)

	return nil
}

func productCreateEndpoint(c echo.Context) error {
	type request struct {
		Name   string `json:"name"`
		Price1 int64  `json:"price1"`
		Price2 int64  `json:"price2"`
		Price3 int64  `json:"price3"`
	}

	var req request
	c.Bind(&req)
	log.Println(req)
	result, _ := s.CreateProduct(req)

	c.JSON(http.StatusOK, result)

	return nil
}

func supplierListEndpoint(c echo.Context) error {
	type response struct {
		Result    string      `json:"result"`
		Suppliers interface{} `json:"suppliers"`
	}

	suppliers, err := s.GetAllSuppliers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return err
	}

	c.JSON(http.StatusOK,
		&response{
			Result:    "success",
			Suppliers: suppliers,
		},
	)

	return nil
}

func supplierCreateEndpoint(c echo.Context) error {
	type request struct {
		Type string `json:"type"`
		Code string `json:"code"`
	}

	type response struct {
		Result    string      `json:"result"`
		Suppliers interface{} `json:"suppliers"`
	}

	var req request
	c.Bind(&req)
	_, err := s.CreateSupplier(req.Type, req.Code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"error": err.Error(),
		})
		return err
	}

	suppliers, err := s.GetAllSuppliers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"error": err.Error(),
		})
		return err
	}

	c.JSON(http.StatusOK,
		&response{
			Result:    "success",
			Suppliers: suppliers,
		},
	)

	return nil
}
