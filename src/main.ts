import { createApp, App } from 'vue'
import ElementPlus from 'element-plus'
import zhCN from 'vxe-table/es/locale/lang/zh-CN'
import { VXETable, Column, Table, Icon } from 'vxe-table'
import XEUtils from 'xe-utils'
import MyApp from './App.vue'
import router from './router/index'
import store from './store/index'
import 'element-plus/dist/index.css'
import './assets/css/reset.less'
import './assets/iconfont/iconfont.css'
import 'vxe-table/styles/cssvar.scss'

VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
})
function useTable(app: App) {
  app.use(Table).use(Column).use(Icon)
}
createApp(MyApp).use(ElementPlus).use(router).use(store).use(useTable).mount('#app')
