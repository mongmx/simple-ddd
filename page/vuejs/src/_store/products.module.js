import { productService } from '../_services/product.service';

const state = {
    all: {}
};

const actions = {
    getAll({ commit }) {
        commit('getAllRequest');

        productService.getAll()
            .then(
                products => commit('getAllSuccess', products),
                error => commit('getAllFailure', error)
            );
    },

    create({ commit }, product) {
        commit('createRequest', product);

        productService.create(product)
            .then(
                product => commit('createSuccess', product),
                error => commit('createFailure', { product, error: error.toString() })
            );
    },

    delete({ commit }, id) {
        commit('deleteRequest', id);

        productService.delete(id)
            .then(
                // eslint-disable-next-line
                product => commit('deleteSuccess', id),
                error => commit('deleteSuccess', { id, error: error.toString() })
            );
    }
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, data) {
        state.all = { items: data.products };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    // eslint-disable-next-line
    createRequest(state) {},
    createSuccess(state, data) {
        // state.all.items.push(data.product);
        state.all.items = data.products;
    },
    createFailure(state, error) {
        state.all = { error };
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.map(user =>
            user.id === id
                ? { ...user, deleting: true }
                : user
        )
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(product => product.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to product 
        state.all.items = state.items.map(product => {
            if (product.id === id) {
                // make copy of product without 'deleting:true' property
                // eslint-disable-next-line
                const { deleting, ...productCopy } = product;
                // return copy of product with 'deleteError:[error]' property
                return { ...productCopy, deleteError: error };
            }

            return product;
        })
    }
};

export const products = {
    namespaced: true,
    state,
    actions,
    mutations
};