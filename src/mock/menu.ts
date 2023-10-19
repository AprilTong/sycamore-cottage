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
            }
          ]
        }
      ]
    })
  }
] as MockMethod[]
