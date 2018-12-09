package admin_test

import (
	"testing"

	"github.com/mongmx/match-order-echo/admin"
	"github.com/mongmx/match-order-echo/mock"
	"github.com/stretchr/testify/assert"
)

func TestGetAllProducts(t *testing.T) {
	mockRepo := mock.AdminRepository{
		GetAllProductsFunc: func() (interface{}, error) {
			// assert.Equal(t, int64(1), clientID)
			return nil, nil
		},
	}

	t.Run("success", func(t *testing.T) {
		repo := mockRepo
		s, err := admin.NewService(&repo)
		assert.NoError(t, err)

		products, err := s.GetAllProducts()
		assert.NotNil(t, products)
		assert.NoError(t, err)
		assert.True(t, repo.GetAllProductsInvoked)
	})
}
