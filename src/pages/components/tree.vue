<template>
  <div id="container" class="tree-box"></div>
</template>
<script lang="ts" setup>
import { Graph } from '@antv/x6'
import { onMounted } from 'vue'

const data = {
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40, // Number，必选，节点位置的 x 值
      y: 40, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'hello' // String，节点标签
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160, // Number，必选，节点位置的 x 值
      y: 180, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'world', // String，节点标签
      shape: 'ellipse'
    }
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2', // String，必须，目标节点 id
      shape: 'double-edge'
    }
  ]
}

const initChart = () => {
  const graph = new Graph({
    container: document.getElementById('container') as HTMLElement,
    width: 800,
    height: 600,
    background: {
      color: '#fffbe6'
    },
    grid: {
      size: 10,
      visible: true
    }
  })
  graph.zoom(0.5)
  graph.translate(80, 40)
  graph.fromJSON(data)
}
onMounted(() => {
  initChart()
})
</script>
<style lang="less" scoped>
.tree-box {
  padding: 30px;
}
</style>
