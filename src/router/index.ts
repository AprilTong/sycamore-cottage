import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import loginRoute from './login'
import componentRoute from './components'

const routes: Array<RouteRecordRaw> = [
    ...loginRoute,
    ...componentRoute
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
