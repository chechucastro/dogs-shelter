import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/DogListView.vue')
  },
  {
    path: '/dogs/:id',
    name: 'DogDetails',
    component: () => import('@/views/DogDetailsView.vue'),
    props: true
  },
  {
    path: '/dogs/:id/timeline',
    name: 'DogTimeline',
    component: () => import('@/views/DogTimelineView.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

