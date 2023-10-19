<template>
  <el-container h-screen class="content-wrap">
    <layoutHeader></layoutHeader>
    <el-container class="main-wrap">
      <layoutAside></layoutAside>
      <!-- <tabList></tabList> -->
      <el-container direction="vertical" class="main-container">
        <el-main>
          <layoutMain></layoutMain>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import layoutHeader from './header/layoutHeader.vue'
import layoutAside from './aside/layoutAside.vue'
import layoutMain from './main/layoutMain.vue'
// import tabList from '@/layouts/tab/index.vue'
</script>

<style lang="less" scoped>
.content-wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  .main-wrap {
    flex: 1;
    min-height: 0px;
  }
}
.el-main {
  padding: 0;
}
.main-container {
  padding-top: 48px;
  padding-bottom: 0px;
  padding-left: 200px;
  overflow: visible;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
  .el-main {
    padding: 8px;
  }
}
</style>
