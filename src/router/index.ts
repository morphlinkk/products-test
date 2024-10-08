import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },  
    {
      path: '/products',
      name: 'products',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/product/:id',
      name: 'productDetails',
      component: () => import('../views/ProductPageView.vue'),
      props: true,  
    },  
    { 
      path: '/create-product',
      name: 'createProduct',
      component: () => import('../views/ProductCreationView.vue')
    },
    {
      path: '/editProduct/:id',
      name: 'editProduct',
      component: () => import('../views/EditProductView.vue'),
      props: true,  
    },
  ]
})

export default router
