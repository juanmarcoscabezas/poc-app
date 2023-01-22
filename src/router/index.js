import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        name: 'Pokemon',
        component: () => import('../views/Pokemon.vue'),
        props: true
      },
      {
        path: 'pokemon/:id',
        name: 'Detail',
        component: () => import('../views/Detail.vue'),
        props: true
      },
      {
        path: 'favorites',
        name: 'Favorites',
        component: () => import('../views/Favorites.vue')
      },
      {
        path: 'pokemon',
        name: 'PokemonEmpty',
        redirect: { name: 'Pokemon' }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
