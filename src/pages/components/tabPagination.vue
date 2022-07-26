<template>
    <div class="dataNav">
        <ul class="dataNavList" ref="dataNavList">
            <li
                class="dataNavListItem"
                v-for="(item, index) in state.navList"
                :key="index"
                :style="{ transform: 'translateX(-' + state.move + 'px)' }"
            >
                <span :class="{ active: state.activeName == item.value }">{{ item.label }}</span>
            </li>
        </ul>
    </div>
    <span :class="['action', state.move != 0 && !state.dataLen ? '' : 'disabled']" @click="navPrev"
        >左</span
    >
    <span
        :class="[
            'action',
            state.move != state.dataNavListRealWidth - state.dataNavListViewWidth + 100 &&
            !state.dataLen
                ? ''
                : 'disabled'
        ]"
        @click="navNext"
    >
        右
    </span>
</template>
<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
/**
 * tab分页
 */
const state = reactive({
    activeName: 0,
    dataNavListRealWidth: 0,
    dataNavListViewWidth: 0,
    dataLen: false,
    move: 0,
    navList: [
        {
            label: 'tab1',
            value: 0
        },
        {
            label: 'tab1ajhhahahha',
            value: 1
        },
        {
            label: 'tab1哈哈哈',
            value: 2
        },
        {
            label: 'tab1嘿嘿嘿',
            value: 3
        },
        {
            label: 'tab1嘻嘻嘻',
            value: 4
        }
        // {
        //     label: 'tab1应用了',
        //     value: 5
        // }
    ],
    scrollLeft: 0
})
const dataNavList = ref()
onMounted(() => {
    initPage()
    dataNavList.value.addEventListener('scroll', scrollBox)
})
const initPage = () => {
    state.activeName = state.navList[0].value // 默认数组第一个选中
    state.dataNavListRealWidth = dataNavList.value.scrollWidth // scrollWidth获取整个菜单实际宽度
    state.dataNavListViewWidth = dataNavList.value.offsetWidth // offsetWidth获取菜单在当前页面可视宽度
    if (state.dataNavListRealWidth <= state.dataNavListViewWidth) {
        // tab不多的时候不显示左右两边的操作按钮
        state.dataLen = true
    }
    // 窗口大小变化时触发。实时更新可视宽度
    window.onresize = () => {
        return (() => {
            state.dataNavListViewWidth = dataNavList.value.offsetWidth
            if (state.move > state.dataNavListViewWidth) {
                state.move = state.dataNavListViewWidth
            }
        })()
    }
}
// 当菜单项向右的可移动距离大于单个菜单项的宽度时，move减去一个菜单项的宽度（即右移移动一个菜单项的宽度），
// 当菜单项向右的可移动距离小于单个菜单项的宽度时，move等于0（即回到最开始没有移动的状态）
const navPrev = () => {
    if (state.move > 0) {
        // 是否为移动距离刚好是一个tab
        const isMultiple = state.move % 100
        const dis = isMultiple === 0 ? state.move : Math.ceil(state.move / 100) * 100
        state.move = state.move - state.dataNavListViewWidth
    }
}
// 当菜单项向左的可移动距离大于单个菜单项的宽度时，move减去一个菜单项的宽度（即左移移动一个菜单项的宽度），
// 当菜单项向左的可移动距离小于单个菜单项的宽度时，move等于可以向左移动的最大值（即到最末尾）
//实际宽度减去可视宽度就是可移动的范围即move的范围
const navNext = () => {
    dataNavList.value.scrollLeft = 50
    // scrollBox()
    // const canMoveDis = state.dataNavListRealWidth - state.move
    // if (canMoveDis > state.dataNavListViewWidth) {
    //     // 是否为移动距离刚好是一个tab
    //     const isMultiple = state.scrollLeft === 0
    //     const dis = isMultiple ? state.move : Math.ceil(state.scrollLeft / 100) * 100
    //     state.move = state.move + state.dataNavListViewWidth
    // }
}
const tabInfo = () => {}

// 滚动的时候
const scrollBox = () => {
    state.scrollLeft = dataNavList.value.scrollLeft
    state.move = 0
    // state.move =
    //     dataNavList.value.scrollLeft >= state.dataNavListViewWidth
    //         ? state.dataNavListViewWidth
    //         : dataNavList.value.scrollLeft
}
</script>
<style lang="less" scoped>
.active {
    color: #ff813b;
}
.dataNav {
    margin-top: 50px;
    display: inline-flex;
    width: 200px;
    background-color: #fff;
    margin-left: 100px;
    .dataNavList {
        display: flex;
        overflow-x: auto;
        .dataNavListItem {
            display: inline-block;
            /*//每个菜单项的宽度要固定，不然move值无法计算，当然也可以通过其他方法来设置以适应自己的表格*/
            width: 100px;
            min-width: 100px;
            max-width: 100px;
            border-radius: 5px;
            font-size: 15px;
            text-align: center;
            color: #7e8690;
            line-height: 35px;
            /*// 过渡效果*/
            transition: transform 0.2s;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        :hover {
            color: #1d4190;
            cursor: pointer;
        }
    }
}
.action {
    line-height: 35px;
    margin-left: 8px;
    cursor: pointer;
    &:hover {
        color: #409eff;
    }
}
.disabled {
    color: #9e9e9e;
    &:hover {
        color: #9e9e9e;
    }
}
</style>
