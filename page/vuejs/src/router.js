import Vue from 'vue'
import Router from 'vue-router'

import LoginPage from './views/LoginPage'
// import RegisterPage from './views/RegisterPage'

import Layout from './views/Layout'
// import IntroPage from './views/IntroPage'
// import DashboardPage from './views/DashboardPage'
// import UserPage from './views/UserPage'
import ProductPage from './views/ProductPage'
import SupplierPage from './views/SupplierPage'

Vue.use(Router)

export const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL+"/#/",
  base: "admin/page/",
  routes: [
    { path: '/login', component: LoginPage },
    // { path: '/register', component: RegisterPage },

    { 
      path: '/', 
      component: Layout,
      children: [
        // {
        //   path: 'intro',
        //   alias: '',
        //   component: IntroPage,
        //   name: 'Intro', 
        //   meta: {description: 'Overview of environment'}
        // },
        // {
        //   path: 'dashboard',
        //   alias: '',
        //   component: DashboardPage,
        //   name: 'Dashboard', 
        //   meta: {description: 'Overview of environment'}
        // },
        // {
        //   path: 'user',
        //   alias: '',
        //   component: UserPage,
        //   name: 'User', 
        //   meta: {description: 'User management'}
        // },
        {
          path: 'product',
          alias: '',
          component: ProductPage,
          name: 'Product',
          meta: {description: 'Product'}
        },
        {
          path: 'supplier',
          alias: '',
          component: SupplierPage,
          name: 'Supplier',
          meta: {description: 'Supplier'}
        }
      ]
    },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  // const publicPages = ['/login', '/register'];

  // const publicPages = ['/login'];
  // const authRequired = !publicPages.includes(to.path);
  // const loggedIn = localStorage.getItem('user');

  // if (authRequired && !loggedIn) {
  //   return next('/login');
  // }

  next();
})