import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/user/login', // 注意，这里只能是string格式
    method: 'get',
    timeout: 1000,
    response: () => ({
      code: 200,
      message: 'ok',
      data: {
        username: 'admin',
        nickname: 'Admin',
        token: 'admin-token',
        avatar: 'https://iph.href.lu/100x100?text=MD&fg=FFFFFF&bg=000000',
        menuList: [
          {
            title: '组件',
            icon: 'i-ep-odometer',
            name: 'dashboard',
            path: '/dashboard',
            children: [
              {
                title: '树图',
                icon: '',
                name: 'tree',
                path: '/dashboard/tree',
                component: 'dashboard/tree.vue'
              },
              {
                title: '监控页',
                icon: '',
                name: 'monitor',
                path: '/dashboard/monitor',
                component: 'dashboard/monitor.vue'
              }
            ]
          }
        ]
      }
    })
  }
] as MockMethod[] // 这里其实就是定义数据格式的，不了解的同学可以参考typescript的官方文档
