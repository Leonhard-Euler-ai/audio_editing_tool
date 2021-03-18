import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('views/login/LoginView')
const Main = () => import('views/main/MainView')
const Failure=()=>import('components/common/NotFound')

import loginStatus from '@/store/getters'

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/main',
    component: Main
  },
  {
    path:'/notfound',
    component: Failure
  },{
    path:'/*',
    component:Failure
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  //Vue.prototype.$store.state.token.length===0
  //console.log(loginStatus);
  if (!loginStatus) {
    return next('/login')
  }
  next()
}))

export default router
