import { supplierService } from '../_services/supplier.service';

const state = {
    all: {}
};

const actions = {
    getAll({ commit }) {
        commit('getAllRequest');

        supplierService.getAll()
            .then(
                suppliers => commit('getAllSuccess', suppliers),
                error => commit('getAllFailure', error)
            );
    },

    create({ commit }, supplier) {
        commit('createRequest', supplier);

        supplierService.create(supplier)
            .then(
                supplier => commit('createSuccess', supplier),
                error => commit('createFailure', { supplier, error: error.toString() })
            );
    },

    delete({ commit }, id) {
        commit('deleteRequest', id);

        supplierService.delete(id)
            .then(
                // eslint-disable-next-line
                supplier => commit('deleteSuccess', id),
                error => commit('deleteSuccess', { id, error: error.toString() })
            );
    }
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, data) {
        state.all = { items: data.suppliers };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    // eslint-disable-next-line
    createRequest(state) {},
    createSuccess(state, data) {
        // state.all.items.push(data.supplier);
        state.all.items = data.suppliers;
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
        state.all.items = state.all.items.filter(supplier => supplier.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to supplier 
        state.all.items = state.items.map(supplier => {
            if (supplier.id === id) {
                // make copy of supplier without 'deleting:true' property
                // eslint-disable-next-line
                const { deleting, ...supplierCopy } = supplier;
                // return copy of supplier with 'deleteError:[error]' property
                return { ...supplierCopy, deleteError: error };
            }

            return supplier;
        })
    }
};

export const suppliers = {
    namespaced: true,
    state,
    actions,
    mutations
};