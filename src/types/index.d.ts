import { Component } from 'vue'
import 'vue-router'

/** 路由描述 */
interface IRouteMeta {
    /** 路由标题(可用来作document.title或者菜单的名称) */
    title: string
    /** 缓存页面 */
    keepAlive?: boolean
    /** 菜单和面包屑对应的图标 */
    icon?: string
    /** 是否在菜单中隐藏(一些列表、表格的详情页面需要通过参数跳转，所以不能显示在菜单中) */
    hidden?: boolean
    /** 路由顺序，可用于菜单的排序 */
    sort?: number
}

/** 单个路由的类型结构(动态路由模式：后端返回此类型结构的路由) */
interface IRoute {
    /** 路由名称(路由唯一标识) */
    name: string
    /** 路由路径 */
    path: string
    /** 路由重定向 */
    redirect?: string
    /**
     * 路由组件
     */
    component?: Component
    /** 子路由 */
    children?: IRoute[]
    /** 路由描述 */
    meta: IRouteMeta
}

declare module 'vue-router' {
    interface RouteMeta extends IRouteMeta { }
}

/** 后端返回的菜单结构 */
interface IMenu {
    /** 菜单标题 */
    title: string
    /** 授权标识（与路由name对应） */
    name: string
    /** 跳转路径 */
    path: string
    /** 组件路径（例如：**.vue） */
    component: string
    /** 菜单和面包屑对应的图标 */
    icon?: string
    /** 缓存页面 */
    cache?: boolean
    /** 是否在菜单中隐藏 */
    hidden?: boolean
    /** 菜单的排序 */
    sort?: number
    /** 子菜单 */
    children?: IMenu[]
}
