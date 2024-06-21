/**
 * @description:树型图的样式
 */

export const defaultStateStyles = {
  // 鼠标悬浮样式
  // hover: {
  //     stroke: '#2196f3',
  //     lineWidth: 1,
  // },
  active: {
    stroke: '#2196f3',
    lineWidth: 1
  }
}
export const comboStateStyles = {
  // 选中
  selected: {
    stroke: '#2196f3',
    lineWidth: 2
  },
  active: {
    stroke: '#2196f3',
    lineWidth: 1
  }
}
// 节点样式
export const defaultNodeStyle = {
  fill: '#ffffff',
  // stroke: '#ffffff',
  radius: 5,
  active: {
    stroke: '#2196f3',
    lineWidth: 1
  }
}
// 线的样式
export const defaultEdgeStyle = {
  stroke: '#91d5ff',
  endArrow: {
    path: 'M 0,0 L 12, 6 L 9,0 L 12, -6 Z',
    fill: '#91d5ff',
    d: -20
  }
}

// label展示样式
export const defaultLabelCfg = {
  style: {
    fill: '#000',
    fontSize: 12,
    textAlign: 'left'
  }
}

// 基本布局
export const defaultLayout = {
  // type: 'compactBox',
  // direction: 'TB',
  type: 'indented',
  direction: 'LR',
  align: 'UL', // 顶部对齐并尽可能向左对齐
  rankdir: 'LR', // 从左到右布局

  dropCap: false,
  indent: 200,
  getHeight: (): number => {
    return 60
  },
  getId: (d: { id: string }): string => {
    return d.id
  },
  getWidth: (): number => {
    return 16
  },
  getVGap: (): number => {
    return 40
  },
  getHGap: (): number => {
    return 70
  }
}
