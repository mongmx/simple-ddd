import Vue from 'vue'
import Vuex from 'vuex'

import { alert } from './alert.module';
import { account } from './account.module';
import { users } from './users.module';
import { products } from './products.module';
import { suppliers } from './suppliers.module';

Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {

//   },
//   mutations: {

//   },
//   actions: {

//   }
// })

export const store = new Vuex.Store({
  modules: {
      alert,
      account,
      users,
      products,
      suppliers
  }
});