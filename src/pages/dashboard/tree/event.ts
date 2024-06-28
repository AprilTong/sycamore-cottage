import { Util } from '@antv/g6'
import type { Graph } from '@antv/g6'

/**
 * @description:树型图的事件绑定
 */

// 展开收起子节点
export function collapseNode(graph: Graph): void {
  // 展开和收起子节点
  graph.on('node:click', (e: any) => {
    if (e.target.get('name') === 'collapse-icon') {
      e.item.getModel().collapsed = !e.item.getModel().collapsed
      graph.setItemState(e.item, 'collapsed', e.item.getModel().collapsed)
      graph.layout()
    }
  })
}

// 鼠标滑入
export function mouseenterNode(graph: Graph): void {
  graph.on('node:mouseover', (evt: any) => {
    const { item, target } = evt
    if (item._cfg.id === 'root') return
    const canHoverName = ['node-rect', 'remove-item']
    if (!canHoverName.includes(target.get('name'))) return

    // 显示icon
    const deleteItem = item.get('group').find(function (el: any) {
      return el.cfg.name === 'remove-item'
    })
    deleteItem.attr('opacity', 1)

    // eslint-disable-next-line no-underscore-dangle
    if (item._cfg && item._cfg.keyShape) {
      item._cfg.keyShape.attr('stroke', '#2196f3')
    }

    graph.setItemState(item, 'active', true)
  })
}

// 鼠标离开
export function mouseLeaveNode(graph: Graph): void {
  graph.on('node:mouseout', (evt: any) => {
    const { item, target } = evt
    const canHoverName = ['node-rect', 'remove-item']
    if (item._cfg.id === 'root') return
    if (!canHoverName.includes(target.get('name'))) return
    // 隐藏icon
    const deleteItem = item.get('group').find(function (el: any) {
      return el.cfg.name === 'remove-item'
    })
    deleteItem.attr('opacity', 0)
    if (item._cfg && item._cfg.keyShape) {
      item._cfg.keyShape.attr('stroke', '#fff')
    }
    graph.setItemState(item, 'active', false)
  })
}

/**
 * @description 文本超长显示
 */
export const fittingString = (str: string, maxWidth: number, fontSize: number): string => {
  const ellipsis = '...'
  const ellipsisLength = Util.getTextSize(ellipsis, fontSize)[0]
  let currentWidth = 0
  let res = str
  const pattern = new RegExp('[\u4E00-\u9FA5]+') // distinguish the Chinese charactors and letters
  str.split('').forEach((letter, i) => {
    if (currentWidth > maxWidth - ellipsisLength) return
    if (pattern.test(letter)) {
      // Chinese charactors
      currentWidth += fontSize
    } else {
      // get the width of single letter according to the fontSize
      currentWidth += Util.getLetterWidth(letter, fontSize)
    }
    if (currentWidth > maxWidth - ellipsisLength) {
      res = `${str.substr(0, i)}${ellipsis}`
    }
  })
  return res
}
