import G6 from '@antv/g6'
import type { Graph } from '@antv/g6'

import { collapseNode, mouseenterNode, mouseLeaveNode, fittingString } from './event'
import { defaultLayout, comboStateStyles, defaultNodeStyle, defaultLabelCfg } from './style'

// 渲染
export function renderMap(data: any[], graph: Graph): void {
  G6.registerNode(
    'icon-node',
    {
      options: {
        size: [60, 20],
        stroke: '#73D13D',
        fill: '#fff'
      },
      draw(cfg: any, group: any) {
        const styles = (this as any).getShapeStyle(cfg)
        const { labelCfg = {} } = cfg

        const w = cfg.size[0]
        const h = cfg.size[1]
        const keyShape = group.addShape('rect', {
          attrs: {
            ...styles,
            cursor: 'pointer',
            x: 0,
            y: 0,
            width: w, // 200,
            height: h, // 60
            fill: cfg.style.fill || '#fff'
          },
          name: 'node-rect',
          draggable: true
        })

        // 动态增加和删除元素
        group.addShape('text', {
          attrs: {
            x: 131,
            y: 20,
            r: 6,
            stroke: '#707070',
            cursor: 'pointer',
            opacity: 1,
            fontFamily: 'iconfont',
            textAlign: 'center',
            textBaseline: 'middle',
            text: '\ue658',
            fontSize: 16
          },
          name: 'add-item'
        })
        // 删除icon
        group.addShape('text', {
          attrs: {
            x: 110,
            y: 20,
            r: 6,
            fontFamily: 'iconfont',
            textAlign: 'center',
            textBaseline: 'middle',
            text: '\ue74b',
            fontSize: 14,
            stroke: '#909399',
            cursor: 'pointer',
            opacity: 0
          },
          name: 'remove-item'
        })

        if (cfg.sname) {
          group.addShape('text', {
            attrs: {
              ...labelCfg.style,
              text: fittingString(cfg.sname, 110, 12),
              textAlign: 'left',
              x: 10,
              y: 25
            }
          })
        }
        // 展开收起
        if (cfg.children && cfg.children.length > 0) {
          group.addShape('circle', {
            attrs: {
              width: 24,
              height: 24,
              x: 154,
              y: 20,
              r: 12,
              cursor: 'pointer',
              // symbol: G6.Marker.collapse,
              // stroke: '#fff',
              lineWidth: 1,
              fill: !cfg.collapsed ? '#9e9e9e' : '#2196f3',
              opacity: 1,
              text: 1
            },
            name: 'collapse-icon'
          })
          group.addShape('text', {
            attrs: {
              ...labelCfg.style,
              text: cfg.children.length,
              textAlign: 'left',
              x: 150,
              y: 25,
              fill: '#ffffff',
              fontWeight: 500,
              cursor: 'pointer'
            },
            name: 'collapse-icon'
          })
        }
        return keyShape
      },
      setState(name, value, item) {
        const group = item?.getContainer()
        if (name === 'collapsed') {
          const marker = item?.get('group').find((ele: any) => ele.get('name') === 'collapse-icon')
          const icon = value ? G6.Marker.expand : G6.Marker.collapse
          marker.attr('symbol', icon)
        }
        if (name === 'selected') {
          const nodeRect = group?.find(function (e) {
            return e.get('name') === 'node-rect'
          })
          if (value) {
            nodeRect?.attr({
              stroke: '#2196f3',
              lineWidth: 2
            })
          }
        }
        if (name === 'hover') {
          const addMarker = group?.find(function (e) {
            return e.get('name') === 'add-item'
          })
          const reduceMarker = group?.find(function (e) {
            return e.get('name') === 'remove-item'
          })
          if (value) {
            addMarker?.attr({
              opacity: 1
            })
            reduceMarker?.attr({
              opacity: 1
            })
          }
        }
      },
      update: undefined
    },
    'rect'
  )

  G6.registerEdge('flow-line', {
    draw(cfg: any, group: any) {
      const { startPoint } = cfg
      const { endPoint } = cfg

      const { style } = cfg
      const shape = group.addShape('path', {
        attrs: {
          stroke: style.stroke,
          endArrow: style.endArrow,
          path: [
            ['M', startPoint.x, startPoint.y],
            ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
            ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
            ['L', endPoint.x, endPoint.y]
          ]
        }
      })

      return shape
    }
  })
  graph.data(data)
  graph.render()
  // graph.fitView();
  // graph.on('node:click', () => {
  //     graph.setMode('edit')
  // })
  mouseenterNode(graph)
  mouseLeaveNode(graph)
  collapseNode(graph)
}

// 初始化graph
export function initGraph(graphWrapId: string): Graph {
  const width = (document.getElementById(graphWrapId) as HTMLElement).clientWidth || 1000
  const height = (document.getElementById(graphWrapId) as HTMLElement).clientHeight || 1000
  const graph = new G6.TreeGraph({
    container: graphWrapId,
    width,
    height,
    linkCenter: true,
    animate: false,
    fitView: false, // 自动调整节点位置和缩放，使得节点适应画布大小
    modes: {
      // 'scroll-canvas' drag-canvas
      default: ['scroll-canvas'],
      edit: ['click-select']
    },
    defaultNode: {
      type: 'icon-node',
      size: [120, 40],
      style: defaultNodeStyle,
      labelCfg: defaultLabelCfg
    },
    defaultEdge: {
      type: 'cubic-vertical'
    },
    // nodeStateStyles: defaultStateStyles,
    // edgeStateStyles: defaultStateStyles,
    comboStateStyles,
    layout: defaultLayout
  })
  return graph
}
