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
    name: 'ProductDetail',
    component: () => import("../components/DetailProduct")
  }, {
    path: '/products',
    name: 'Products',
    component: () => import('../components/TblProducts'),
    beforeEnter: (to, from, next) => {
      // Is the user name not null
      console.log(this.$store.state.token);
      if(this.$store.state.token) {
        next() // Take you to /chat
      } else {
          // If params.name is blank or in your case, does not have permission, redirect back to the welcome page
        next({ name: 'ProductsCatalog' }) 
      }
    }
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
