import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home/Index.vue')
  },
  {
    path: '/sign-up',
    name: 'Signup',
    component: () => import('@/pages/Auth/SignUp.vue')
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('@/pages/Auth/SignIn.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/pages/Profile/Index.vue')
  },
  {
    path: '/coffeeBeans',
    name: 'CoffeeBeans',
    component: () => import('@/pages/CoffeeBean/Index.vue')
  },
  {
    path: '/coffeeBeans/register',
    name: 'CoffeeBeanRegister',
    component: () => import('@/pages/CoffeeBean/Register.vue')
  },
  {
    path: '/coffeeBeans/:id',
    name: 'CoffeeBeanShow',
    component: () => import('@/pages/CoffeeBean/Show.vue')
  },
  {
    path: '/coffeeBeans/:id/reviews',
    name: 'Reviews',
    component: () => import('@/pages/Review/Index.vue')
  },
  {
    path: '/coffeeBeans/:id/reviews/register',
    name: 'ReviewRegister',
    component: () => import('@/pages/Review/Register.vue')
  },
  {
    path: '/coffeeBeans/:id/reviews/:reviewId',
    name: 'ReviewShow',
    component: () => import('@/pages/Review/Show.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router
