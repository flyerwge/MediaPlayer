import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import discovery from '../components/Middle/discovery.vue'
import playlists from '../components/Middle/playlists.vue'
import songs from '../components/Middle/songs.vue'
import mvs from '../components/Middle/mvs.vue'
import result from '../components/Middle/result.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/discovery',
    name: 'discovery',
    // 跳转到对应路径
    component: () => import('../components/Middle/discovery.vue')
  },
  {
    path: '/playlists',
    name: 'playlists',
    // 跳转到对应路径
    component: () => import('../components/Middle/playlists.vue')
  },
  {
    path: '/songs',
    name: 'songs',
    // 跳转到对应路径
    component: () => import('../components/Middle/songs.vue')
  },
  {
    path: '/mvs',
    name: 'mvs',
    // 跳转到对应路径
    component: () => import('../components/Middle/mvs.vue')
  },
  {
    path: '/result',
    name: 'result',
    // 跳转到对应路径
    component: () => import('../components/Middle/result.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
