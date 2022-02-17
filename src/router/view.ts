import { RouteRecordRaw } from 'vue-router'
import Home from '@/pages/home/index.vue'
import TagInput from '@/pages/components/tagInput.vue'

const viewRoute: Array<RouteRecordRaw> = [
    {
        path: '/home',
        name: 'home',
        component: Home,
        children: [
            {
                path: '/tagInput',
                name: 'tagInput',
                component: TagInput
            }
        ]
    },

]
export default viewRoute
