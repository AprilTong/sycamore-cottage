
import { IMenu, IRoute } from '@/types/index'
import { nextTick } from 'vue'
import { cloneDeep } from 'lodash'

/**
 * 菜单相关数据
 */
interface StoreState {
    /** 存路由列表 */
    cacheList: string[]
    /** 菜单列表 */
    menuList: IMenu[]
    /** 动态路由 */
    dynamicRouteList: IRoute[]
    /** 有权限的第一个菜单 */
    permissionMenu: string
}
const menus = {
    namespaced: true,
    state: {
        cacheList: [],
        menuList: [],
        dynamicRouteList: [],
        permissionMenu: '/',
    },

    mutations: {
        // 保存登录用户的菜单列表
        setMenuList(state: StoreState, menuList: IMenu[]) {
            state.menuList = menuList
        },

        // 保存用户第一个权限菜单
        setPermissionMenu(state: StoreState, menuPath = '/') {
            state.permissionMenu = menuPath
        },

        // 保存动态路由
        setDynamicRouteList(state: StoreState, dynamicRouteList: IRoute[]) {
            state.dynamicRouteList = dynamicRouteList
        },

        // 设置路由缓存
        setCache(state: StoreState, cacheList: string[]) {
            state.cacheList = cacheList
        },

        // 清除路由缓存
        clearCache(state: StoreState) {
            state.cacheList = []
        },
        // 刷新路由缓存
        resetCache(state: StoreState, routeItem?: string) {
            const cacheList = cloneDeep(state.cacheList)
            if (routeItem) {
                state.cacheList = cacheList.filter((item: string) => item !== routeItem)
            } else {
                state.cacheList = []
            }
            nextTick(() => {
                state.cacheList = cacheList
            })
        },
    },
}
export default menus
