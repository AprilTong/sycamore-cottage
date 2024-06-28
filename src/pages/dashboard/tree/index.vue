<template>
  <div class="tree-wrap">
    <el-button type="primary" class="clear-btn" @click="clearGraph">重置</el-button>
    <div class="content">
      <div class="tree-wrap">
        <div id="container" class="one-tree"></div>
        <el-input
          v-if="state.showInput"
          ref="inputRref"
          v-model="state.input"
          class="node-input"
          :style="state.inputStyle"
          :maxlength="20"
          @blur="blurNodeInput"
        ></el-input>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { uniqueId } from 'lodash-es'
import { initGraph, renderMap } from './index'

const inputRref = ref()
const state = reactive({
  treeData: {
    id: 'root',
    sname: 'root',
    name: uniqueId(),
    children: []
  } as any,
  showInput: false,
  inputStyle: {
    left: '0px',
    top: '0px'
  },
  input: '',
  graph: null as any,
  editOne: null as any,
  editType: ''
})

const blurNodeInput = () => {
  const { editOne, editType, input } = state
  const item = editType === 'edit' ? editOne._cfg.id : editOne.id

  // 如果是添加并且没有输入值
  if (editType === 'add' && !input) {
    state.graph.removeChild(item)
    state.showInput = false
    return
  }
  state.graph.updateItem(item, {
    sname: input
  })
  // 添加时更新父节点
  if (editType === 'add') {
    state.graph.updateItem(editOne.parentId, {})
  }

  state.showInput = false
}
const focusInput = (curId: string) => {
  // state.graph.focusItem(curId)
  // const canvasXY = state.graph.getViewPortCenterPoint()
  const curTarget = state.graph.findDataById(curId)
  state.editOne = curTarget
  const canvasXY = state.graph.getCanvasByPoint(curTarget.x, curTarget.y)
  state.input = ''
  setTimeout(() => {
    state.showInput = true
    nextTick(() => {
      inputRref.value.focus()
    })
  }, 200)
  state.inputStyle = {
    left: `${canvasXY.x - 100}px`,
    top: `${canvasXY.y}px`
  }
}

const handleAddOneTree = () => {
  state.showInput = false
  const id = uniqueId()
  const curId = uniqueId()
  state.treeData.children.push({
    id: curId,
    sname: '',
    name: id,
    parentId: 'root'
  })
  state.editType = 'add'
  renderMap(state.treeData, state.graph)
  focusInput(curId)
}

const addEvent = (graph: any) => {
  graph.on('node:click', (evt: any) => {
    const { item, target } = evt
    const name = target.get('name')

    // 增加元素
    const model = item.getModel()
    if (name === 'add-item') {
      state.editType = 'add'
      // 如果收起需要展开
      if (model.collapsed) model.collapsed = false
      // 没有子级的时候设置空数组
      if (!model.children) model.children = []
      const id = uniqueId()
      model.children.push({
        id,
        name: 1,
        sname: '',
        parentId: model.id
      })
      graph.updateChild(model, model.id)
      // graph.focusItem(id)
      // const curTarget = graph.findDataById(id)
      // const viewPortXY = graph.getViewPortCenterPoint()
      // const canvasXY = graph.getCanvasByPoint(viewPortXY.x, viewPortXY.y)
      const curTarget = graph.findDataById(id)
      const canvasXY = graph.getCanvasByPoint(curTarget.x, curTarget.y)
      state.editOne = curTarget
      state.input = curTarget.sname
      setTimeout(() => {
        state.showInput = true
        nextTick(() => {
          inputRref.value.focus()
        })
      }, 200)
      state.inputStyle = {
        left: `${canvasXY.x}px`,
        top: `${canvasXY.y}px`
      }
    }
    // 删除节点
    if (name === 'remove-item') {
      graph.removeChild(model.id)
      // 查找当前的父id，更新其子元素的长度
      graph.updateItem(model.parentId, {})
    }

    // 编辑
    if (name === 'node-rect') {
      const curTarget = graph.findDataById(item._cfg.id)
      const canvasXY = graph.getCanvasByPoint(curTarget.x, curTarget.y)
      state.editOne = evt.item
      state.input = curTarget.sname
      state.showInput = true
      state.editType = 'edit'
      nextTick(() => {
        inputRref.value.focus()
      })
      state.inputStyle = {
        left: `${canvasXY.x}px`,
        top: `${canvasXY.y}px`
      }
    }
  })
  // 画布滚动、拖动时，不能编辑节点名称
  graph.on('dragstart', () => {
    state.showInput = false
  })
  graph.on('wheel', () => {
    state.showInput = false
  })
}
// 清空树图
const clearGraph = () => {
  state.treeData = {
    id: 'root',
    sname: 'root',
    name: 1,
    children: []
  }
  renderMap(state.treeData, state.graph)
}
const mapTree = (item: any) => {
  const haveChildren = Array.isArray(item.children) && item.children.length > 0
  const { id, sname } = item
  return {
    id,
    sname,
    children: haveChildren ? item.children.map((el: any) => mapTree(el)) : []
  }
}

onMounted(() => {
  nextTick(() => {
    state.graph = initGraph('container')
    state.graph.clear()
    addEvent(state.graph)
    renderMap(state.treeData, state.graph)
  })
})
</script>
<style lang="less" scoped>
.tree-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .clear-btn {
    width: 80px;
  }
  .content {
    flex: 1;
    min-height: 0px;
    // height: 100%;
    overflow-y: auto;
    background-color: #f5f5f5;
    padding: 10px;
    display: flex;

    .tree-wrap {
      flex: 1;
      overflow: auto;
      position: relative;
      .one-tree {
        width: 100%;
        height: 100%;
        :deep(canvas) {
          position: relative;
          // left: -100px;
        }
      }
      .node-input {
        position: absolute;
        line-height: 20px;
        height: 40px;
        width: 120px;
        margin-top: 1px;
      }
    }
  }
}
</style>
