import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import loginRoute from './login'

const routes: Array<RouteRecordRaw> = [
    ...loginRoute
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
