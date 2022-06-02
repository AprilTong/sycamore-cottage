<template>
    <div class="box">
        <div id="container"></div>
        <el-input
            v-if="state.showInput"
            :style="state.inputStyle"
            v-model="state.input"
            ref="inputRref"
            @blur="focusInput"
        ></el-input>
    </div>
</template>
<script lang="ts" setup>
import G6 from '@antv/g6'
import { onMounted, reactive, ref, nextTick } from 'vue'
import { renderMap } from './common'
import { cloneDeep } from 'lodash'

onMounted(() => {
    initData()
})

const inputRref = ref()
const state = reactive({
    showInput: false,
    input: '',
    graph: {} as any,
    inputStyle: {
        left: '0px',
        top: '0px'
    },
    data: {
        //定义一个公共数据数组
        id: 'root',
        label: 'root',
        name: 1,
        children: [
            {
                id: 'c1',
                label: 'c1',
                name: 2,

                children: [
                    {
                        id: 'c1-1',
                        label: 'c1-1',
                        name: 3
                    },
                    {
                        id: 'c1-2',
                        label: 'c1-2',
                        name: 3,
                        children: [
                            {
                                id: 'c1-2-1',
                                label: 'c1-2-1',
                                name: 4
                            },
                            {
                                id: 'c1-2-2',
                                label: 'c1-2-2',
                                name: 4
                            }
                        ]
                    }
                ]
            },
            {
                id: 'c2',
                label: 'c2',
                name: 2
            },
            {
                id: 'c3',
                label: 'c3',
                name: 2,

                children: [
                    {
                        id: 'c3-1',
                        label: 'c3-1',
                        name: 3
                    },
                    {
                        id: 'c3-2',
                        label: 'c3-2',
                        name: 3,

                        children: [
                            {
                                id: 'c3-2-1',
                                label: 'c3-2-1',
                                name: 4
                            },
                            {
                                id: 'c3-2-2',
                                label: 'c3-2-2',
                                name: 4
                            },
                            {
                                id: 'c3-2-3',
                                label: 'c3-2-3',
                                name: 4
                            }
                        ]
                    },
                    {
                        id: 'c3-3',
                        label: 'c3-3',
                        name: 3
                    }
                ]
            }
        ]
    },
    editOneId: ''
})

const initData = () => {
    // 业设置状态样式
    const defaultStateStyles = {
        // 鼠标悬浮
        hover: {
            stroke: '#1890ff',
            lineWidth: 2
        }
    }
    const comboStateStyles = {
        // 选中
        selected: {
            stroke: '#2196f3',
            lineWidth: 2
        }
    }
    const defaultNodeStyle = {
        fill: '#F3F7FF',
        stroke: '#3759B0',
        radius: 5
    }
    const defaultEdgeStyle = {
        stroke: '#91d5ff',
        endArrow: {
            path: 'M 0,0 L 12, 6 L 9,0 L 12, -6 Z',
            fill: '#91d5ff',
            d: -20
        }
    }
    const defaultLabelCfg = {
        style: {
            fill: '#000',
            fontSize: 12,
            textAlign: 'left'
        }
    }
    const defaultLayout = {
        type: 'indented',
        direction: 'LR',
        dropCap: false,
        indent: 200,
        getHeight: () => {
            return 60
        },
        getId: function getId(d) {
            return d.id
        },
        getWidth: function getWidth() {
            return 16
        },
        getVGap: function getVGap() {
            return 40
        },
        getHGap: function getHGap() {
            return 70
        }
    }
    const width = document.getElementById('container').scrollWidth || 1000
    const height = document.getElementById('container').scrollHeight || 1000
    state.graph = new G6.TreeGraph({
        container: 'container',
        width: width,
        height: height,
        linkCenter: true,
        modes: {
            default: ['drag-canvas'],
            edit: ['click-select']
        },
        defaultNode: {
            type: 'icon-node',
            size: [120, 40],
            style: defaultNodeStyle,
            labelCfg: defaultLabelCfg
        },
        defaultEdge: {
            type: 'cubic-horizontal',
            style: {
                stroke: '#A3B1BF'
            }
        },
        nodeStateStyles: defaultStateStyles,
        edgeStateStyles: defaultStateStyles,
        comboStateStyles,
        layout: defaultLayout
    })
    //节点双击事件，这里的编辑页面用的是浏览器的弹窗，也可自己编写页面进行调用
    // state.graph.on('node:dblclick', (evt, element) => {
    //     const { item, target } = evt
    //     const targetType = target.get('type')
    //     state.graph.setItemState(item, 'selected', true)
    //     const name = target.get('name')

    //     const curTarget = state.graph.findDataById(item._cfg.id)

    //     let str = prompt('随便写点儿啥吧', target.attrs.text)
    // })
    state.graph.on('node:click', (evt: any) => {
        const { item, target } = evt

        const targetType = target.get('type')
        const name = target.get('name')

        // 增加元素，这里增加元素也是用的浏览器的弹窗
        if (targetType === 'marker') {
            const model = item.getModel()
            if (name === 'add-item') {
                if (!model.children) {
                    model.children = []
                }
                const id = 'ra' + Math.random()
                var str = prompt('请输入节点名称', '比如c3-3-4')
                if (str) {
                    target.attrs.label = str
                    model.children.push({
                        id,
                        name: 1,
                        label: str
                    })
                    state.graph.updateChild(model, model.id)
                }
                //删除节点
            } else if (name === 'remove-item') {
                state.graph.removeChild(model.id)
            }
            return
        }
        const curTarget = state.graph.findDataById(item._cfg.id)
        const canvasXY = state.graph.getCanvasByPoint(curTarget.x, curTarget.y)
        // state.editOneId = cloneDeep(item._cfg.id)
        state.editOneId = evt
        // state.graph.updateItem(item, {
        //     label: '点击'
        // })
        state.input = curTarget.label
        state.showInput = true
        nextTick(() => {
            inputRref.value.focus()
        })
        state.inputStyle = {
            left: canvasXY.x + 'px',
            top: canvasXY.y + 'px'
        }
    })

    renderMap(state.data, state.graph) //渲染
}
// 编辑失去焦点
const focusInput = () => {
    const { item } = state.editOneId
    state.graph.updateItem(item._cfg.id, {
        label: state.input
    })
    state.showInput = false
    console.log('123', item._cfg.id)
    // const item = state.graph.findById(state.editOneId)
    // state.data.children[0].label = state.input
    // let model = state.editOneId
    // item.update({
    //     ...item,
    //     label: state.input
    // })

    // state.graph.get('canvas').set('localRefresh', false)
    // // state.graph.refreshItem(item)
    // item._cfg.model.label = state.input
    // state.graph.refreshItem(item)

    // state.graph.fitView()
    // state.graph.render()
}
</script>
<style lang="less">
.box {
    .el-input {
        position: absolute;
        line-height: 20px;
        height: 20px;
        width: 100px;
        margin-top: 1px;
    }
}
</style>
