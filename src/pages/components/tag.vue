<template>
    <el-popover
        placement="bottom-start"
        :width="285"
        trigger="click"
        v-model:visible="defaultVisible"
    >
        <template #reference>
            <div class="tag-input" tabindex="-1">
                <div
                    id="input"
                    class="input"
                    ref="inputRef"
                    contenteditable="true"
                    @blur="handleInputBlur"
                    v-if="showInput"
                    @keydown.delete="handleDelete($event)"
                ></div>
            </div>
        </template>
        <div class="fn-list">
            <ul>
                <li
                    class="menu-item"
                    v-for="(item, index) in defaultOption"
                    :key="index"
                    @click="handleSelectOne(item)"
                >
                    <div class="item-content" :data-label="item.name" :data-value="index">
                        {{ item.name }}
                    </div>
                </li>
            </ul>
        </div>
    </el-popover>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, inject, onMounted, watch, nextTick } from 'vue'
import { pasteHtmlAtCaret, saveSelection, getParamByDom } from '@/utils/inputTag'

interface option {
    name: string
}
export default defineComponent({
    name: 'tagInput',
    emits: ['get-input-params'],
    props: {
        inputDom: {
            type: String,
            required: false
        },
        id: {
            type: String,
            required: true
        },
        /**
         * 是否禁止输入
         */
        disabledInput: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    setup(prop, { emit }) {
        const inputRef = ref()
        const state = reactive({
            defaultVisible: false,
            tagInputRange: null as any,
            showInput: true
        })
        onMounted(() => {
            if (prop.inputDom) {
                inputRef.value.innerHTML = prop.inputDom
            }
            document.onkeydown = function (e) {
                if (e.keyCode === 32) {
                    return false
                }
            }
        })
        watch(
            () => prop.id,
            (newVal) => {
                if (newVal) {
                    state.showInput = false
                    nextTick(() => {
                        state.showInput = true
                        nextTick(() => {
                            inputRef.value.innerHTML = prop.inputDom
                        })
                    })
                }
            }
        )
        const defaultOption = inject('defaultOption') as option[]
        // 选择一个默认值
        const handleSelectOne = (item: any) => {
            pasteHtmlAtCaret(
                `<span class='block' contenteditable='false' data-id="${
                    item.fieldId || ''
                }" front-id="${item.id || ''}">${item.name}</span>&nbsp;`,
                inputRef.value,
                state.tagInputRange
            )
        }
        // 添加一个字符串
        const handleAddInputStr = (str: string) => {
            pasteHtmlAtCaret(`${str}`, inputRef.value, state.tagInputRange)
        }
        const handleInputBlur = () => {
            state.tagInputRange = saveSelection()
            emit('get-input-params', getParamByDom(inputRef.value))
            //  getParamByDom(inputRef.value)
        }
        // 处理删除操作
        const handleDelete = (e: Event) => {
            // e.preventDefault()
            // 获取光标前的最后一个dom
            const endOffset = window.getSelection()?.getRangeAt(0)?.endOffset

            let node = Array.from(inputRef.value.childNodes)
            let privewNode = Array.from(inputRef.value.childNodes).slice(0, endOffset)
            let len = privewNode.length
            let lastNode = privewNode[len - 1] as any
            // 如果最后一个是span，删除
            if (lastNode && lastNode.nodeName === 'SPAN') {
                let currentNode = node.find(
                    (el: any) => el.nodeName === 'SPAN' && el.dataset.id === lastNode.dataset.id
                )
                e.preventDefault()
                inputRef.value.removeChild(currentNode)
            }

            let commonFn = () => {
                let secondLast = privewNode[len - 2] as any

                if (secondLast && secondLast.nodeName === 'SPAN') {
                    let currentNode = node.find(
                        (el: any) =>
                            el.nodeName === 'SPAN' && el.dataset.id === secondLast.dataset.id
                    )
                    if (currentNode) {
                        e.preventDefault()
                        inputRef.value.removeChild(currentNode)
                    }
                }
            }
            if (lastNode && lastNode.nodeName === '#text' && /^\s$/.test(lastNode.nodeValue)) {
                commonFn()
            }
        }
        return {
            ...toRefs(state),
            defaultOption,
            inputRef,
            handleInputBlur,
            handleSelectOne,
            handleDelete,
            handleAddInputStr
        }
    }
})
</script>
<style lang="less" scoped>
.tag-input {
    margin: 0 auto;
    width: 310px;
    position: relative;
    .input {
        border: 1px solid #ccc;
        padding: 8px 12px;
        span {
            background-color: #7fffd4;
        }
        :deep(.block) {
            display: inline-block;

            padding: 4px 6px;
            box-sizing: border-box;
            border-radius: 16px;
            background: rgb(216, 238, 255);
            color: rgb(23, 76, 118);
            border: 1px solid rgb(187, 214, 234);
        }
    }
    .input:focus {
        border: 1px solid #1e88e5;
        outline: none;
    }
}
.fn-list {
    padding: 5px 0;
    border-radius: 3px;
    background: #fff;
    z-index: 11;
    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
        li {
            list-style-type: none;
        }
        .menu-item {
            cursor: pointer;
            height: 36px;
            line-height: 36px;
            vertical-align: middle;
            box-sizing: border-box;
            width: 100%;
            .item-content {
                display: block;
                position: relative;
                padding: 0 16px;
                color: currentColor;
                overflow: hidden;
                text-overflow: ellipsis;
                box-sizing: border-box;
                width: 100%;
                white-space: nowrap;
            }
            .item-content:hover {
                background-color: #1e88e5;
                text-decoration: none;
                color: #fff;
            }
        }
    }
}
</style>
