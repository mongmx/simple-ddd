package customer

import "github.com/labstack/echo"

var s Service

// Routes in customer domain
func Routes(route *echo.Echo, service Service) {
	s = service
	// customer := route.Group("/api/v1/customer")
	// {
	// 	customer.GET("/product")
	// }
}
