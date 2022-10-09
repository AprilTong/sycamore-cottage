<template>
    <el-container h-screen direction="vertical">
        <layoutHeader></layoutHeader>
        <el-container>
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
.el-main {
    padding: 0;
}
.main-container {
    padding-top: 60px;
    padding-bottom: 0px;
    padding-left: 200px;
    overflow: visible;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
}
</style>
