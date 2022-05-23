import { RouteRecordRaw } from 'vue-router'
import Home from '@/pages/home/index.vue'
import TagInput from '@/pages/components/tagInput.vue'
import TreeDemo from '@/pages/components/treeDemo.vue'
import Demo from '@/pages/components/demo2.vue'
import Upload from '@/pages/components/upload.vue'

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
            },
            {
                path: '/tree',
                name: 'TreeDemo',
                component: TreeDemo
            },
            {
                path: '/demo',
                name: 'demo',
                component: Demo
            },
            {
                path: '/upload',
                name: 'upload',
                component: Upload
            }
        ]
    },

]
export default viewRoute
