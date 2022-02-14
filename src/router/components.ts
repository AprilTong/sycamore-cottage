import { RouteRecordRaw } from 'vue-router'
import TagInput from '@/pages/components/tagInput.vue'

const componentRoute: Array<RouteRecordRaw> = [
    {
        path: '/tagInput',
        name: 'tagInput',
        component: TagInput
    }
]
export default componentRoute
