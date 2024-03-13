import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('../views/HomeView.vue')
    },
    {
      path: '/video/:videoIdx',
      name: 'video',
      props: true,
      component: () => import('../views/VideoView.vue')
    }
  ]
})

export default router
