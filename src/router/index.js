import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Register from '@/views/register'
import Forget from '@/views/forget'
import Index from '@/views/index'
import System from '@/views/system'
import Apply from '@/components/apply'
import Repair from '@/components/repair'
import Share from '@/components/share'
import Me from '@/views/me'
import Commenting from '@/views/commenting'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: '/index/repair',
      children: [
        {
          name: 'repair',
          path: 'repair',
          component: Repair
        },
        {
          name: 'apply',
          path: 'apply',
          component: Apply
        },
        {
          name: 'share',
          path: 'share',
          component: Share
        }
      ]
    },
    {
      path: '/system',
      name: 'system',
      component: System
    },
    {
      path: '/me',
      name: 'me',
      component: Me
    },
    {
      path: '/commenting',
      name: 'commenting',
      component: Commenting
    }
  ]
})
