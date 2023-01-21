import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    props: true
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../views/Favorites.vue')
  },
  {
    path: '/pokemon',
    name: 'HomeDetail',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/pokemon/:id',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
