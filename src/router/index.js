import Vue from 'vue'
import VueRouter from 'vue-router'
// import Vuexstate from '../store/index.js'
const Login = () => import('@/views/login')
const Layout = () => import('@/views/layout')
const qa = () => import('@/views/layout/qa')
const video = () => import('@/views/layout/video')
const my = () => import('@/views/layout/my')

Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/qa',
        component: qa
      },
      {
        path: '/video',
        component: video
      },
      {
        path: 'my',
        component: my
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && Vuexstate.state.user !== null) {
//     next()
//   } else if (to.name === 'Login') {
//     next()
//   } else next({ path: '/login' })
// })
export default router
