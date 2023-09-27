import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

import { ElMessage } from 'element-plus'
import { addRoutes } from './addRoute'
import { getLocalStorage } from '@/utils/storage'
import store from '@/store/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/pages/login/index.vue')
  },
  {
    path: '/redirect/:path*',
    name: 'redirect',
    meta: {
      title: '重定向'
    },
    component: () => import('@/layouts/redirect/redirect.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // token存在
    if (getLocalStorage('token')) {
      const menuSore = (store.state as any).menus
      if (menuSore.menuList.length > 0) {
        next()
      } else {
        await addRoutes()
        next({
          ...to,
          replace: true
        })
      }
    } else if (to.path !== '/login') {
      ElMessage.warning('您还未登录，请先登录')
      next({ path: '/login' })
    } else {
      next()
    }
    // next()
  }
)
export default router
