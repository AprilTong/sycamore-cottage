import { MockMethod } from 'vite-plugin-mock'

const timeout = Math.random() * 1000
export default [
  {
    url: '/api/getUserMenu', // 注意，这里只能是string格式
    method: 'get',
    timeout,
    response: () => ({
      code: 200,
      message: 'ok',
      data: [
        {
          title: '业务组件',
          icon: 'icon-folder',
          name: 'dashboard',
          path: '/dashboard',
          children: [
            {
              title: '树图',
              icon: 'icon-tree',
              name: 'tree',
              path: '/dashboard/tree',
              component: 'dashboard/tree.vue'
            },
            {
              title: '树形表格拖动',
              icon: 'icon-table',
              name: 'tableTree',
              path: '/dashboard/table',
              component: 'dashboard/table.vue'
            },
            {
              title: 'css的has伪类',
              // icon: 'icon-table',
              name: 'cssHas',
              path: '/dashboard/cssHas',
              component: 'dashboard/cssHas.vue'
            },
            {
              title: 'CSS 计时器',
              // icon: 'icon-table',
              name: 'timer',
              path: '/dashboard/timer',
              component: 'dashboard/timer.vue'
            }
            // {
            //   title: 'vueRouter两种路由',
            //   icon: 'icon-table',
            //   name: 'router',
            //   path: '/dashboard/router',
            //   component: 'dashboard/router.vue'
            // }
          ]
        }
      ]
    })
  }
] as MockMethod[]
