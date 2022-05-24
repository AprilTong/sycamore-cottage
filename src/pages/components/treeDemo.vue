<template>
    <div id="box"></div>
    <!-- <div class="right">
        <el-button>添加</el-button>
    </div> -->
</template>
<script lang="ts" setup>
import G6 from '@antv/g6'
import { onMounted, reactive } from 'vue'
const data = {
    defaultNode: {
        size: 80, // 节点大小
        // ...                 // 节点的其他配置
        // 节点样式配置
        style: {
            fill: 'steelblue', // 节点填充色
            stroke: '#999', // 节点描边色
            lineWidth: 1 // 节点描边粗细
        },
        // 节点上的标签文本配置
        labelCfg: {
            // 节点上的标签文本样式配置
            style: {
                fill: '#fff' // 节点标签文字颜色
            }
        }
    },
    // 点集
    nodes: [
        {
            id: 'node1', // String，该节点存在则必须，节点的唯一标识
            x: 100, // Number，可选，节点位置的 x 值
            y: 200, // Number，可选，节点位置的 y 值
            label: 'hello'
            // labelCfg: {
            //     positions: 'center',
            //     style: {
            //         fontSize: 20,
            //         color: '#f5f5f5'
            //     },
            //     color: '#f5f5f5'
            // },
            // style: {
            //     // 包裹样式属性的字段 style 与其他属性在数据结构上并行
            //     // fill: '#000', // 样式属性，元素的填充色
            //     color: '#f5f5f5'
            //     // stroke: '#888' // 样式属性，元素的描边色
            //     // ...              // 其他样式属性
            // }
        },
        {
            id: 'node2', // String，该节点存在则必须，节点的唯一标识
            x: 300, // Number，可选，节点位置的 x 值
            y: 200, // Number，可选，节点位置的 y 值
            label: 'world'
        }
    ],
    // 边集
    edges: [
        {
            source: 'node1', // String，必须，起始点 id
            target: 'node2', // String，必须，目标点 id,
            label: '我是连线'
        }
    ]
}
const state = reactive({
    idBoxList: []
})
onMounted(() => {
    // initDom()
    initTreeData()
    // initData()
})
const initData = async () => {
    const response = await fetch(
        'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'
    )
    const remoteData = await response.json()
    const nodes = remoteData.nodes
    nodes.forEach((node: any) => {
        if (!node.style) {
            node.style = {}
        }
        switch (
            node.class // 根据节点数据中的 class 属性配置图形
        ) {
            case 'c0': {
                node.type = 'circle' // class = 'c0' 时节点图形为 circle
                break
            }
            case 'c1': {
                node.type = 'rect' // class = 'c1' 时节点图形为 rect
                node.size = [35, 20] // class = 'c1' 时节点大小
                break
            }
            case 'c2': {
                node.type = 'ellipse' // class = 'c2' 时节点图形为 ellipse
                node.size = [35, 20] // class = 'c2' 时节点大小
                break
            }
        }
    })
    const graph = new G6.Graph({
        container: 'box', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: 800, // Number，必须，图的宽度
        height: 500, // Number，必须，图的高度
        // fitView: true,
        // fitViewPadding: [20, 40, 50, 20],
        layout: {
            // Object，可选，布局的方法及其配置项，默认为 random 布局。
            type: 'force', // 指定为力导向布局
            preventOverlap: true // 防止节点重叠
            // nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
        }
    })
    graph.data(remoteData)
    graph.render()
}

const initTreeData = () => {
    G6.registerNode('card-node', {
        draw: function drawShape(cfg, group) {
            const r = 2
            const color = '#5B8FF9'
            const w = cfg.size[0]
            const h = cfg.size[1]
            const shape = group.addShape('rect', {
                attrs: {
                    x: -w / 2,
                    y: -h / 2,
                    width: w, //200,
                    height: h, // 60
                    // stroke: color,
                    radius: r,
                    fill: '#fff'
                },
                name: 'main-box',
                draggable: true
            })

            group.addShape('rect', {
                attrs: {
                    x: -w / 2,
                    y: -h / 2,
                    width: w, //200,
                    height: h / 2, // 60
                    // fill: '#333',
                    radius: [r, r, 0, 0]
                },
                name: 'title-box',
                draggable: true
            })

            // title text
            group.addShape('text', {
                attrs: {
                    textBaseline: 'top',
                    x: -w / 2 + 8,
                    y: -h / 2 + 2,
                    lineHeight: 40,
                    text: cfg.id,
                    fill: '#333'
                },
                name: 'title'
            })
            cfg.children &&
                group.addShape('marker', {
                    attrs: {
                        x: w / 2,
                        y: 0,
                        r: 6,
                        cursor: 'pointer',
                        symbol: G6.Marker.collapse,
                        stroke: '#666',
                        lineWidth: 1,
                        fill: '#fff'
                    },
                    name: 'collapse-icon'
                })
            group.addShape('text', {
                attrs: {
                    textBaseline: 'top',
                    x: -w / 2 + 8,
                    y: -h / 2 + 24,
                    lineHeight: 20,
                    text: cfg.text,
                    height: 60,
                    fill: 'rgba(0,0,0, 1)'
                },
                name: `description`
            })
            // 绘制添加子节点的
            group.addShape('text', {
                attrs: {
                    x: w / 2 + 10,
                    y: 5,
                    r: 6,
                    cursor: 'pointer',
                    text: '+',
                    stroke: '#666',
                    lineWidth: 1,
                    fill: '#f5f5f5'
                },
                name: 'add-children'
            })
            return shape
        },
        setState(name, value, item) {
            if (name === 'collapsed') {
                const marker = item.get('group').find((ele) => ele.get('name') === 'collapse-icon')
                const icon = value ? G6.Marker.expand : G6.Marker.collapse
                marker.attr('symbol', icon)
            }
        }
    })

    const data = {
        id: 'A',
        text: '第一层',
        children: [
            {
                id: 'A1',
                text: '1',
                children: [
                    { id: 'A11', text: '1-1' },
                    { id: 'A12', text: '1-2' },
                    { id: 'A13', text: '1-3' },
                    { id: 'A14', text: '1-4' }
                ]
            },
            {
                id: 'A2',
                text: '2',
                children: [
                    {
                        id: 'A21',
                        text: '2-1',
                        children: [
                            { id: 'A211', text: '2-1-1' },
                            { id: 'A212', text: '2-1-2' }
                        ]
                    },
                    {
                        id: 'A22',
                        text: '2-2'
                    }
                ]
            }
        ]
    }

    const container = document.getElementById('box')
    const width = container.scrollWidth || 1000
    const height = container.scrollHeight || 1000

    const graph = new G6.TreeGraph({
        container: 'box',
        width,
        height,
        modes: {
            default: ['drag-canvas']
        },
        defaultNode: {
            type: 'card-node',
            size: [100, 40]
        },
        defaultEdge: {
            type: 'cubic-horizontal',
            style: {
                endArrow: true
            }
        },
        layout: {
            type: 'indented',
            direction: 'LR',
            dropCap: false,
            indent: 200,
            getHeight: () => {
                return 60
            }
        }
    })

    graph.data(data)
    // graph.setMode('edit')
    graph.render()
    graph.fitView()
    graph.on('node:click', (e) => {
        if (e.target.get('name') === 'collapse-icon') {
            e.item.getModel().collapsed = !e.item.getModel().collapsed
            graph.setItemState(e.item, 'collapsed', e.item.getModel().collapsed)
            graph.layout()
        }
    })
    graph.on('node:click', (e) => {
        if (e.target.get('name') !== 'collapse-icon' && e.target.get('name') !== 'add-children') {
            const { item } = e

            graph.updateItem(item, {
                text: '点击'
            })
        }
    })
    // 添加子节点
    graph.on('node:click', (e) => {
        if (e.target.get('name') === 'add-children') {
            console.log('hahah', e.item)
        }
    })
    if (typeof window !== 'undefined')
        window.onresize = () => {
            if (!graph || graph.get('destroyed')) return
            if (!container || !container.scrollWidth || !container.scrollHeight) return
            graph.changeSize(container.scrollWidth, container.scrollHeight)
        }
}

const initDom = () => {
    G6.registerNode(
        'card-node',
        {
            draw: (cfg, group) => {
                return group.addShape('dom', {
                    attrs: {
                        width: 500,
                        height: 316,
                        html: `
         <div style="border:1px solid #2196f3;border-radius:5px;">
         <div style="text-align:center;background:#2196f3;font-size:18px;color:#fff;font-weight:bold;">${cfg.label}</div>

        </div>
           `
                    },
                    draggable: true
                })
            }
        },
        'rect'
    )
    const data = {
        nodes: [
            { id: 'node1', x: 50, y: 100 },
            { id: 'node2', x: 150, y: 100 }
        ],
        edges: [{ source: 'node1' }, { target: 'node2' }]
    }
    const graph = new G6.Graph({
        container: 'box',
        width: 500,
        height: 500,
        defaultNode: {
            type: 'dom-node',
            size: [120, 40]
        }
    })
    graph.data(data)
    graph.render()
}
</script>
<style lang="less" scoped>
.right {
    float: right;
}
</style>
