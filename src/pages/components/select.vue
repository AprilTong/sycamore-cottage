<template>
    <div class="demo-wrap">
        <el-popover
            placement="bottom-start"
            :width="200"
            trigger="click"
            popper-class="my-select-popover"
            v-model:visible="state.dropDownVisible"
            ref="popoverRef"
            :fallback-placements="['bottom', 'top', 'right', 'left']"
        >
            <template #reference>
                <div
                    :class="['selector', state.dropDownVisible ? 'active-wrap' : '']"
                    @mouseenter="handleHover"
                    @mouseleave="handleLeave"
                    @click="handleOpenDrop"
                >
                    <div class="select-con">
                        <div v-for="(option, index) in state.selectTag" class="one-option">
                            <span
                                :class="['colorful-wrap', 'option-normal']"
                                :style="{ backgroundColor: option.color }"
                            >
                                {{ option.value }}
                                <i
                                    v-if="state.dropDownVisible"
                                    class="iconfont icon-shanchu1 del-select"
                                    @click="handleDelSel(index)"
                                ></i>
                            </span>
                        </div>
                        <input
                            ref="inputRef"
                            v-if="state.dropDownVisible"
                            v-model="state.search"
                            type="text"
                            @click.stop
                            @input="handleSearch"
                            maxlength="20"
                        />
                    </div>
                    <i
                        v-if="state.showDel"
                        class="iconfont icon-shibai del-icon"
                        @click.stop="handleDelAll"
                    ></i>
                    <i v-else class="iconfont icon-xiala"></i>
                </div>
            </template>
            <div class="option-list">
                <template v-if="state.optionList.length > 0">
                    <el-scrollbar>
                        <div
                            v-for="option in state.optionList"
                            :class="[
                                'one-option',
                                getOptionChecked(option) ? 'selected-option' : ''
                            ]"
                            @click="handleSel(option)"
                        >
                            <span
                                :class="['colorful-wrap', 'option-normal']"
                                :style="{ backgroundColor: option.color }"
                            >
                                {{ option.value }}
                            </span>
                            <i
                                v-show="getOptionChecked(option)"
                                class="iconfont icon-xuanzhong check-icon"
                            ></i>
                        </div>
                    </el-scrollbar>
                </template>
                <p class="empty" v-else>暂无搜索结果</p>
                <p
                    class="add-tag overflow-ellipsis"
                    v-if="state.search && !inputIsExit"
                    @click="handleInputAdd"
                >
                    添加新的选项：{{ state.search }}
                </p>
            </div>
        </el-popover>
    </div>
</template>
<script lang="ts" setup>
import { computed, reactive, ref, nextTick, onMounted } from 'vue'
import { cloneDeep, debounce } from 'lodash'

import { optionColorList } from '@/utils/commonData'
import { ElNotification } from 'element-plus'

/**
 *  自定义选择框
 */

const popoverRef = ref()
const state = reactive({
    optionList: [
        {
            color: '#2196F3',
            index: 0,
            key: 'a17f1e6105904d39',
            score: null,
            value: '选项1'
        },
        {
            color: '#07c9c9',
            index: 1,
            key: '41de29cce2bc472e',
            score: null,
            value: '选项2'
        },
        {
            color: '#00c345',
            index: 2,
            key: '8357fc8e50134221',
            score: null,
            value: '选项3'
        },
        {
            color: '#07c9c9',
            index: 2,
            key: '8357fc8e50134221',
            score: null,
            value: '选项4'
        }
    ],
    dropDownVisible: false,
    search: '',
    selectTag: [] as any[],
    showDel: false,
    allOptionList: [
        {
            color: '#2196F3',
            index: 0,
            key: 'a17f1e6105904d39',
            score: null,
            value: '选项1'
        },
        {
            color: '#07c9c9',
            index: 1,
            key: '41de29cce2bc472e',
            score: null,
            value: '选项2'
        },
        {
            color: '#00c345',
            index: 2,
            key: '8357fc8e50134221',
            score: null,
            value: '选项3'
        },
        {
            color: '#07c9c9',
            index: 2,
            key: '8357fc8e50134221',
            score: null,
            value: '选项4'
        }
    ]
})

const inputRef = ref()
// 输入的是不存在的
const inputIsExit = computed(() => {
    const { search } = state
    return state.allOptionList.filter((el) => el.value === search).length > 0 ? true : false
})
// 打开下拉弹框
const handleOpenDrop = () => {
    focusSearch()
}
const focusSearch = () => {
    setTimeout(() => {
        nextTick(() => {
            inputRef.value?.focus()
        })
    }, 100)
}
const handleSel = (item:) => {
    // 如果是单选则直接覆盖

    // 如果已经选中，则需要取消选中
    if (getOptionChecked(item)) {
        let selIndex = state.selectTag.findIndex((el) => el.value === item.value)
        state.selectTag.splice(selIndex, 1)
    } else {
        state.selectTag.push(item)
    }
    state.search = ''
    state.optionList = cloneDeep(state.allOptionList)
    focusSearch()
}
const handleDelAll = () => {
    state.selectTag = []
}
const handleHover = () => {
    if (state.selectTag.length > 0) {
        state.showDel = true
    }
}
const handleLeave = () => {
    state.showDel = false
}
const handleSearch = debounce(() => {
    const { search } = state
    if (!search) {
        state.optionList = cloneDeep(state.allOptionList)
    } else {
        state.optionList = state.allOptionList.filter((el) => el.value.includes(search))
    }
}, 10)
// 获取当前option是否被选中
const getOptionChecked = (item: any) => {
    // value值不能重复，可以用value进行判断
    const allValue = state.selectTag.map((el) => el.value)
    return allValue.includes(item.value)
}
const handleInputAdd = () => {
    const tempOption = {
        index: state.allOptionList.length,
        score: null,
        value: state.search,
        color: optionColorList[0],
        key: state.search
    }
    state.selectTag.push(tempOption)
    // 把该选项添加到可选数据中
    state.allOptionList.push(tempOption)
    state.search = ''
    state.dropDownVisible = false
    state.dropDownVisible = true
    state.optionList = cloneDeep(state.allOptionList)
    focusSearch()
    // nextTick(() => {
    //     popoverRef.value?.updatePopper()
    // })
}
// 删除已经选择的
const handleDelSel = (index: number) => {
    state.selectTag.splice(index, 1)
}
</script>
<style lang="less" scoped>
.demo-wrap {
    margin: 50px;
    .selector {
        width: 200px;
        border: 1px solid #d9d9d9;
        background-color: rgba(247, 247, 247, 1);
        height: auto;
        min-height: 36px;
        border-radius: 3px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;
        cursor: pointer;
        .select-con {
            flex: 1;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            input {
                width: 100%;
                height: 100%;
                border: none;
                background-color: inherit;
                flex: 1;
                &:focus {
                    border: none;
                    background-color: inherit;
                    outline: none;
                }
            }
            .one-option {
                margin: 5px;
                .del-select {
                    color: #f5f5f5;
                    font-size: 13px;
                }
            }
        }
        .del-icon {
            font-size: 12px;
            color: #999;
        }
    }
    .active-wrap {
        border: 1px solid #409eff;
    }
}
.option-list {
    margin: 5px 0px;
    min-height: 30px;
    max-height: 200px;
    overflow: auto;
    .empty {
        color: #999;
        margin: 0 10px;
        line-height: 30px;
    }
    .one-option {
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 10px 5px 20px;

        &:hover {
            background-color: #f5f7fa;
        }
        .check-icon {
            color: @activeColor;
        }
    }
    .selected-option {
        background-color: #e6f7ff;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 600;
    }
    .add-tag {
        height: 34px;
        line-height: 34px;
        color: @activeColor;
        padding: 0 10px;
        cursor: pointer;
    }
}
</style>
