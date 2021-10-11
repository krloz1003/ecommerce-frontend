import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'ProductsCatalog',    
    component: () => import("../components/ProductsCatalog")
  }, {
    path: '/shopping',
    name: 'Shopping',    
    component: () => import("../components/Shopping")
  }, {
    path:'/product/:slug',
    name: 'HelloWorld',
    component: () => import("../components/DetailProduct")
  }, {
    path: '/products',
    name: 'Products',
    component: () => import('../components/TblProducts')
  }, {
    path: '/users',
    name: 'Users',
    component: () => import('../components/TblUsers')
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login')
  }, {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
