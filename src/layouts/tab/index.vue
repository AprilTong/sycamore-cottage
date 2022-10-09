<template>
    <div class="app-tab" bg-bgColor transition-all duration-300 ease-in-out>
        <better-scroll
            ref="tabScroller"
            class="app-tab__scroller"
            :options="{ scrollX: true, scrollY: false, click: false }"
        >
            <buttonTab
                v-for="item in tabList"
                :key="item.fullPath"
                :isActive="activeTab === item.fullPath"
                :closable="tabList.length > 1"
                @close="handleCloseTab(item)"
                @click="handleClickTab(item)"
                @contextmenu.prevent="handleContextMenu($event, item)"
            >
                <span>{{ item.title }}</span>
            </buttonTab>
        </better-scroll>
        <div class="app-tab__right" w-64px h-full text-center @click="handleRefresh">
            <hoverContainer content="重新加载">
                <i
                    class="text-20px align-middle i-ep-refresh-right"
                    :class="{ 'animate-spin': loading }"
                />
            </hoverContainer>
        </div>
        <contextMenu
            v-model:visible="menu.visible"
            :currentTab="(menu.currentTab as Tab)"
            :left="menu.style.left"
            :top="menu.style.top"
        ></contextMenu>
    </div>
</template>

<script lang="ts" setup>
import { useTabStore, useAppStore } from '@/store'
import buttonTab from './components/buttonTab.vue'
import contextMenu from './components/contextMenu.vue'

const appStore = useAppStore()
const { siderWidth } = storeToRefs(appStore)
const loading = ref<boolean>(false)
const handleRefresh = () => {
    loading.value = true
    appStore.reloadPage()
    setTimeout(() => {
        loading.value = false
    }, 1000)
}

const tabStore = useTabStore()
const { tabList, activeTab } = storeToRefs(tabStore)
interface StyleProps {
    left: string
    top: string
}
interface MenuProps {
    visible: boolean
    currentTab?: Tab
    style: StyleProps
}
const menu = reactive<MenuProps>({
    visible: false,
    // currentTab: {},
    style: {
        left: '0px',
        top: '0px'
    }
})

const handleContextMenu = (e: MouseEvent, item: Tab) => {
    menu.visible = true
    menu.currentTab = item
    menu.style.left = e.pageX + 'px'
    menu.style.top = e.pageY + 'px'
}

const route = useRoute()
watch(
    () => route.fullPath,
    () => {
        const currentTab: Tab = {
            title: route.meta.title as string,
            fullPath: route.fullPath,
            icon: route.meta.icon as string,
            name: route.name as string
        }
        tabStore.addTab(currentTab)
        tabStore.setActiveTab(route.fullPath)
    },
    { immediate: true }
)

const handleCloseTab = (item: Tab) => {
    tabStore.removeTab(item)
}

const handleClickTab = (item: Tab) => {
    tabStore.clickTab(item)
}
</script>

<style lang="less" scoped>
.app-tab {
    display: flex;
    align-items: center;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    border-bottom: 1px solid var(--el-border-color);

    position: fixed;
    top: 48px;
    z-index: 999;
    width: 100%;
    padding-left: v-bind(siderWidth);

    &__scroller {
        width: 100%;
        flex: 1;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        margin-left: 12px;
        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>
