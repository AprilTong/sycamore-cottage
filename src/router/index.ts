import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/pages/home/index.vue'
import loginRoute from './login'
import viewRoute from './view'


const routes: Array<RouteRecordRaw> = [
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    ...loginRoute,
    ...viewRoute
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
