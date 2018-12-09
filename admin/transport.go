package admin

import (
	"github.com/labstack/echo"
)

var s Service

// Routes in admin domain
func Routes(route *echo.Echo, service Service) {
	s = service
	admin := route.Group("/api/v1/admin")
	{
		admin.GET("/auth", authEndpoint)
		admin.GET("/products", productListEndpoint)
		admin.POST("/product", productCreateEndpoint)
		admin.GET("/suppliers", supplierListEndpoint)
		admin.POST("/supplier", supplierCreateEndpoint)
	}
}
