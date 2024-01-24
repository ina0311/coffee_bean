import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home/Index.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/pages/User/Index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router
