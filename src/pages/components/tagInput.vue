<template>
  <div class="tag-box">
    <div class="label">标签输入框:</div>
    <div class="content">
      <div
        :id="state.contentId"
        ref="root"
        class="tag-input"
        @input="handleInput($event.target)"
        @keydown.delete="handleDelete($event)"
        @click="inputClick($event)"
      ></div>
      <div class="tag-box">
        <span
          v-for="item in tagList"
          :key="item.name"
          class="one-tag"
          @click="handleAddTag(item.name)"
        >
          {{ item.name }}
        </span>
      </div>
    </div>
  </div>
  <el-tree-select v-model="value" :data="data" :show-all-levels="true" />
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'

const state = reactive({
  contentId: `content1`,
  currentText: '',
  // 记录当前选中tag的ID
  currentTagId: null,
  // 当前光标位置
  savedRange: null as any
})
const root = ref()
const tagList = reactive([
  {
    name: '标签一',
    id: 1
  },
  {
    name: '标签二',
    id: 2
  },
  {
    name: '标签三',
    id: 3
  }
])
const value = ref()
const data = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1'
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1'
          }
        ]
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1'
          }
        ]
      }
    ]
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1'
          }
        ]
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1'
          }
        ]
      }
    ]
  }
]
const selectHandler = () => {
  // 监听选定文本的变动
  const sel: any = window.getSelection()
  const range = sel.rangeCount > 0 ? sel.getRangeAt(0) : null
  if (range && range.commonAncestorContainer.ownerDocument.activeElement.id === state.contentId) {
    state.savedRange = range
  }
}
onMounted(() => {
  // 每次光标变化的时候，保存 range
  document.addEventListener('selectionchange', selectHandler)
})
const handleInput = (target: any) => {
  state.currentText = target.innerText
  // console.log('val', val)
}
// 添加标签
const handleAddTag = (text: string) => {
  // 如果当前input没有聚焦，先聚焦
  if (!state.savedRange) {
    root.value.focus()
    selectHandler()
  }
  const node = document.createElement('span')
  node.innerText = `<${text}>`
  if (state.savedRange.commonAncestorContainer.parentElement.nodeName === 'SPAN') {
    return
  }
  // 在内容中插入标签
  // 删掉选中的内容（如有）
  state.savedRange.deleteContents()
  // 插入链接
  state.savedRange.insertNode(node)
  const target = root.value
  state.currentText = target.innerText
  const sel: any = window.getSelection()
  const range = state.savedRange.cloneRange()
  range.setStartAfter(node)
  range.collapse(false)
  sel.removeAllRanges()
  sel.addRange(range)
}

// 删除键移动光标
const handleDelete = (e: Event) => {
  if (state.currentTagId) {
    // 若已选中模版标签，直接删除dom节点
    const t = document.getElementById(state.currentTagId)
    root.value.removeChild(t)
    state.currentTagId = null
    // 阻止浏览器默认的删除事件，并手动更新数据
    e.preventDefault()
    handleInput(e.target)
  }
}
const inputClick = (e: any) => {
  // 监听点击事件
  const tagName = e.target.nodeName
  if (tagName === 'SPAN') {
    // 点击模版标签时，记录id
    state.currentTagId = e.target.id
    // e.target.className = 'active'
  } else if (state.currentTagId) {
    // 清空active样式
    const target: any = document.getElementById(state.currentTagId)
    target.className = ''
    state.currentTagId = null
  } else {
    state.currentTagId = null
  }
}
</script>
<style lang="less" scoped>
.tag-box {
  display: flex;
  .label {
    margin-right: 10px;
  }
  .tag-input {
    width: 200px;
    min-height: 100px;
    background: #fff;
    box-sizing: border-box;
    padding: 10px;
    line-height: 1.5;
    word-break: break-word;
    // 允许编辑，禁止富文本
    -webkit-user-modify: read-write-plaintext-only !important;
    border: 1px solid #e8eaec;
    &:focus {
      outline: none;
      border-color: #409eff;
    }
    :deep(span) {
      cursor: default;
      -webkit-user-modify: read-only !important;
      padding: 0 10px;
      color: #26a2ff;
      cursor: default;
    }
  }
  .tag-box {
    margin-top: 10px;
    .one-tag {
      font-size: 14px;
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      background-color: #f5f5f5;
      border-radius: 40px;
      margin-right: 5px;
      cursor: pointer;
    }
  }
}
</style>
