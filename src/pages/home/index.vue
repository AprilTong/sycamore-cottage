<template>
    <div class="home">
        <div class="left">
            <el-menu
                router
                background-color="#2f4050"
                text-color="#ffffff"
                active-text-color="#1890ff"
            >
                <el-menu-item :route="{ name: 'tagInput' }">
                    <span>tagInput</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>
    </div>
</template>
<style lang="less" scoped>
.home {
    width: 100vw;
    height: 100vh;
    display: flex;

    .left {
        width: 200px;
        height: 100%;
        background-color: #2f4050;
    }
}
:deep(.el-menu-item) {
    min-width: auto;
    color: #fff;
    height: 38px;
    line-height: 38px;
    font-weight: 600;

    &.is-active {
        // background-color: #ecf5ff;
        // color: #0079fe;
        background-color: #1890ff !important;
        color: rgba(255, 255, 255, 1);
    }

    span {
        font-size: 14px;
    }
}

:deep(.el-menu-item .is-active) {
    background-color: #1890ff !important;
    color: rgba(255, 255, 255, 1);
}
</style>
