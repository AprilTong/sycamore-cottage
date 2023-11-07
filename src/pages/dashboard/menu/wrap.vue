<template>
  <div :ref="drop">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { useDrop } from 'vue3-dnd'
import { ItemTypes } from './ItemTypes'

const props = defineProps<{
  id: string
  // onDrop: (item: any) => void
}>()

const [collect, drop] = useDrop({
  accept: ItemTypes.CARD,
  // drop: props.onDrop,
  // drop: (item, monitor) => {
  //     return {
  //         name: props.id,
  //     }
  // },
  collect: (monitor: any) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
})
</script>
