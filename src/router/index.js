import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path:'/tool',
    name:'tool',
    component: () => import('../views/ToolView.vue'),
  },
  {
    path:'/chipseq',
    name:'chipseq',
    component:()=>import('../views/chipseq.vue')
  },
  {
    path:'/regist',
    name:'regist',
    component:()=>import('../views/Regist.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
