<template>
  <div>
    <Child v-model="inputText"></Child>
    <h1>{{ inputText }}</h1>
  </div>
</template>

<script lang="ts" setup>
import Child from '@/components/child.vue'

const inputText = ref('april')
</script>
