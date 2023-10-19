<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
// import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const locale = zhCn
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
