import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CategoriesView from '../views/CategoriesView.vue'
import PostsView from '../views/PostsView.vue'

import Guard from '../services/auth-header'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: CategoriesView
  },
  {
    path: '/posts',
    name: 'posts',
    beforeEnter: [Guard.authHeader, Guard.authCategory],
    component: PostsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
