<template>
  <template v-for="menu in menus">
    <template v-if="menu.children && menu.children.length > 0">
      <el-sub-menu :key="menu.path" :index="menu.path">
        <template #title>
          <i :class="['iconfont', menu.icon]"></i>
          <span truncate>{{ menu.title }}</span>
        </template>
        <menu-tree :menus="menu.children"></menu-tree>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :key="menu.path" :index="menu.path" @click="clickMenu(menu)">
        <i :class="['iconfont', menu.icon]"></i>
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

<style lang="less" scoped>
i {
  margin-right: 5px;
}
</style>
