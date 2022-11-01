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
          title: '组件',
          icon: 'i-ep-odometer',
          name: 'dashboard',
          path: '/dashboard',
          children: [
            {
              title: '树图',
              icon: 'i-icon-park-outline-workbench',
              name: 'tree',
              path: '/dashboard/tree',
              component: 'dashboard/tree.vue'
            },
            {
              title: '监控页',
              icon: 'i-icon-park-twotone-monitor-camera',
              name: 'monitor',
              path: '/dashboard/monitor',
              component: 'dashboard/monitor.vue'
            }
          ]
        }
      ]
    })
  }
] as MockMethod[] // 这里其实就是定义数据格式的，不了解的同学可以参考typescript的官方文档
