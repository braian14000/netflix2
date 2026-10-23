import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/series', name: 'series', component: HomeView, meta: { requiresAuth: true }, props: { filterType: 'series' } },
  { path: '/peliculas', name: 'movies', component: HomeView, meta: { requiresAuth: true }, props: { filterType: 'movie' } },
  { path: '/mi-lista', name: 'favorites', component: HomeView, meta: { requiresAuth: true }, props: { filterType: 'favorites' } },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    return '/login'
  }
  if ((to.name === 'login' || to.name === 'register') && token) {
    return '/'
  }
})

export default router