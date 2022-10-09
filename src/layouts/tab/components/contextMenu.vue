<template>
    <teleport to="body">
        <transition name="el-zoom-in-center">
            <div class="dropdown-popper" :style="{ left, top }">
                <ul ref="contextMenuRef" class="context-menu" v-if="visible">
                    <li
                        v-for="item in options"
                        :key="item.key"
                        :class="{ 'context-menu-item': true, 'is-disabled': item.disabled }"
                        @click="handleClick(item)"
                    >
                        <i :class="item.icon" m-r-2></i>
                        {{ item.label }}
                    </li>
                </ul>
            </div>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
import { useTabStore, useAppStore } from '@/store'

interface Props {
    /** 右键菜单可见性 */
    visible?: boolean
    /** 当前标签 */
    currentTab: Tab
    /** 鼠标x坐标 */
    left: string
    /** 鼠标y坐标 */
    top: string
}

type DropdownKey =
    | 'reload-current'
    | 'close-current'
    | 'close-other'
    | 'close-left'
    | 'close-right'
    | 'close-all'
type Option = {
    label: string
    key: DropdownKey
    disabled?: boolean
    icon: string
}

const props = withDefaults(defineProps<Props>(), {
    visible: false
})

interface Emits {
    (e: 'update:visible', visible: boolean): void
}
const emit = defineEmits<Emits>()

function hide() {
    emit('update:visible', false)
}
const contextMenuRef = ref(null)
onClickOutside(contextMenuRef, () => {
    hide()
})

const tabStore = useTabStore()
const appStore = useAppStore()
const options = computed<Option[]>(() => [
    {
        label: '重新加载',
        key: 'reload-current',
        disabled: props.currentTab?.fullPath !== tabStore.activeTab,
        icon: 'i-ant-design-reload-outlined'
    },
    {
        label: '关闭当前',
        key: 'close-current',
        disabled: tabStore.tabList.length <= 1,
        icon: 'i-ant-design-close-outlined'
    },
    {
        label: '关闭其他',
        key: 'close-other',
        icon: 'i-ant-design-column-width-outlined'
    },
    {
        label: '关闭左侧',
        key: 'close-left',
        icon: 'i-mdi-format-horizontal-align-left'
    },
    {
        label: '关闭右侧',
        key: 'close-right',
        icon: 'i-mdi-format-horizontal-align-right'
    },
    {
        label: '关闭所有',
        key: 'close-all',
        icon: 'i-ant-design-line-outlined'
    }
])
const actionMap = new Map<string, () => void>([
    [
        'reload-current',
        () => {
            appStore.reloadPage()
        }
    ],
    [
        'close-current',
        () => {
            tabStore.removeTab(props.currentTab)
        }
    ],
    [
        'close-other',
        () => {
            tabStore.clearOtherTab(props.currentTab)
        }
    ],
    [
        'close-left',
        () => {
            tabStore.clearLeftTab(props.currentTab)
        }
    ],
    [
        'close-right',
        () => {
            tabStore.clearRightTab(props.currentTab)
        }
    ],
    [
        'close-all',
        () => {
            tabStore.clearAllTab()
        }
    ]
])

const handleClick = (item: Option) => {
    if (item.disabled) return
    const fn = actionMap.get(item.key)
    fn?.()
    hide()
}
</script>

<style lang="less" scoped>
.dropdown-popper {
    position: absolute;
    z-index: 1000;
    background: var(--el-bg-color-overlay);
    border: 1px solid var(--el-border-color-light);
    box-shadow: var(--el-dropdown-menu-box-shadow);
    border-radius: var(--el-border-radius-base);
    .context-menu {
        position: relative;
        padding: 5px 0;
        margin: 0;
        background-color: var(--el-bg-color-overlay);
        border-radius: var(--el-border-radius-base);
        .context-menu-item {
            display: flex;
            align-items: center;
            white-space: nowrap;
            list-style: none;
            line-height: 22px;
            padding: 5px 16px;
            margin: 0;
            font-size: var(--el-font-size-base);
            color: var(--el-text-color-regular);
            cursor: pointer;
            outline: none;
            &.is-disabled {
                cursor: not-allowed;
                color: var(--el-text-color-disabled);
            }
            &:not(.is-disabled):hover {
                background-color: var(--el-color-primary-light-9);
                color: var(--el-color-primary);
            }
        }
    }
}
</style>
