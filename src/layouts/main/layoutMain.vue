<script setup lang="ts">
const store = useStore()
const { cacheList } = store.state.menus
</script>

<!-- v-if="appStore.reloadFlag" -->
<template>
  <router-view v-slot="{ Component, route }">
    <transition name="el-fade-in" mode="out-in" appear>
      <component :is="Component" :key="route.fullPath" />
    </transition>
  </router-view>
</template>

<style scoped>
.v-enter-active {
  transition-property: opacity, transform;
  transition-duration: 0.2s;
}

.v-enter-from {
  opacity: 0.5;
  transform: translateX(-20px);
}

.v-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
