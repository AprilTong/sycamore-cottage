<template>
  <div class="menu">{{ item.name }}</div>
</template>
<script lang="ts" setup>
const props = defineProps({
  // 菜单item
  item: {
    type: Object,
    default: () => {
      return {}
    },
    required: true
  }
})
</script>
<style lang="less" scoped>
.menu {
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  &:hover {
    color: blue;
  }
}
</style>
