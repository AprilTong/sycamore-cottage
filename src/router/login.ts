import { RouteRecordRaw } from 'vue-router'
import Login from '@/pages/login/index.vue'

const loginRoute: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]
export default loginRoute
