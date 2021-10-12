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
    component: () => import("../components/DetailProduct"),
  }, {
    path: '/products',
    name: 'Products',
    component: () => import('../components/TblProducts'),
    meta: {
      requiresAuth: true,
      //adminAuth: true,
    }
  }, {
    path: '/users',
    name: 'Users',
    component: () => import('../components/TblUsers'),
    meta: {
      requiresAuth: true,
      //adminAuth: true,
    }
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


router.beforeEach((to, from, next) => {
  //const role  = localStorage.getItem ('role');
  const accessToken = localStorage.getItem('access_token');
  
  if(!to.meta.requiresAuth) return next()
    if(accessToken) return next()
      return router.push({path: '/'}).catch(() => {})
  
 
 /*if (to.meta.requiresAuth) {
    if (!role || !accessToken) {
      router.push({path: '/'}).catch(() => {})
    } else {
      if (to.meta.adminAuth) {
        if (role === "admin") {
          return next();
        } else {
          router.push({path: '/'}).catch(() => {})
        }
      }
    }
  } else {
    return next();
  }*/


});
