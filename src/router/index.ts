import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CategoriesView from '../views/CategoriesView.vue'
import PostsView from '../views/PostsView.vue'
import LoginView from '../views/LoginView.vue'

import Guard from '../services/auth-header'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    beforeEnter: Guard.authHeader, 
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: CategoriesView
  },
  {
    path: '/posts',
    name: 'posts',
    component: PostsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
