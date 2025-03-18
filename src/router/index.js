import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/ToolView.vue'

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
    path:'/chipseq',
    name:'chipseq',
    component:()=>import('../views/chipseq.vue')
  },
  {
    path:'/regist',
    name:'regist',
    component:()=>import('../views/Regist.vue')
  },
  {
    path:'/user',
    name:'user',
    component:()=>import('../views/user.vue')
  },
  {
    path:'/genomics',
    name:'genomics',
    component:()=>import('../views/genomics.vue')
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
