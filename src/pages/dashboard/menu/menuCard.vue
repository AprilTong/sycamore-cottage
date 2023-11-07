<template>
  <div :ref="setRef" class="card" :style="{ opacity }" :data-handler-id="handlerId">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, unref } from 'vue'
import { useDrag, useDrop } from 'vue3-dnd'
import { ItemTypes } from './ItemTypes'

const props = defineProps<{
  id: string
  index: number
  firstMenu: boolean
  moveCard: (dragIndex: number, hoverIndex: number, firstMenu: boolean) => void
  // onDrop: () => void
}>()

interface DragItem {
  index: number
  id: string
  type: string
}

const card = ref<HTMLDivElement>()
const [dropCollect, drop] = useDrop({
  accept: ItemTypes.CARD,
  collect(monitor: any) {
    return {
      handlerId: monitor.getHandlerId()
    }
  },
  hover(item: DragItem, monitor: any) {
    if (!card.value) {
      return
    }
    const dragIndex = item.index
    const hoverIndex = props.index
    if (dragIndex === hoverIndex) {
      return
    }

    const hoverBoundingRect = card.value?.getBoundingClientRect()

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    const clientOffset = monitor.getClientOffset()

    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }
    // const findIndex = props.sheetList.findIndex((el) => el.worksheetId === item.id)
    // if (props.firstMenu && findIndex < 0) return
    console.log('1123')
    props.moveCard(dragIndex, hoverIndex, props.firstMenu)

    item.index = hoverIndex
  }
  // drop: props.onDrop,
})

const [collect, drag] = useDrag({
  type: ItemTypes.CARD,
  item: () => {
    return { id: props.id, index: props.index }
  },
  collect: (monitor: any) => ({
    isDragging: monitor.isDragging()
  })
})

const { handlerId } = toRefs(dropCollect)
const { isDragging } = toRefs(collect)
const opacity = computed(() => (unref(isDragging) ? 0 : 1))

const setRef = (el: HTMLDivElement) => {
  card.value = drag(drop(el)) as HTMLDivElement
}
</script>
