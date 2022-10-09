<template>
    <template v-for="menu in menus">
        <template v-if="menu.children && menu.children.length > 0">
            <el-sub-menu :index="menu.path" :key="menu.path">
                <template #title>
                    <el-icon><i :class="menu.icon"></i></el-icon>
                    <span truncate>{{ menu.title }}</span>
                </template>
                <menu-tree :menus="menu.children"></menu-tree>
            </el-sub-menu>
        </template>
        <template v-else>
            <el-menu-item :index="menu.path" :key="menu.path" @click="clickMenu(menu)">
                <el-icon><i :class="menu.icon"></i></el-icon>
                <span truncate>{{ menu.title }}</span>
            </el-menu-item>
        </template>
    </template>
</template>
<script setup lang="ts">
import { IMenu } from '@/types/index'
interface Props {
    menus: IMenu[]
}
const props = withDefaults(defineProps<Props>(), {
    menus: () => []
})

const router = useRouter()
const route = useRoute()

const clickMenu = (menu: IMenu) => {
    const { path } = menu
    if (path.indexOf('http') === 0) {
        window.open(path)
    } else if (path !== route.fullPath) {
        router.push(path)
    }
}
</script>

<style lang="less" scoped></style>
