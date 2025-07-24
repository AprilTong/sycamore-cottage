<template>
  <input v-model="inputValue" type="text" />
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    // 自动转大写
    emit('update:modelValue', value.toUpperCase())
  }
})
</script>
