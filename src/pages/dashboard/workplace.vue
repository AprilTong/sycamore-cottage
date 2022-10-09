<template>
    <div>
        <div class="flex mb3 p3 flex-col space-y6" md="flex-row items-center space-y0 space-x6">
            <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                :size="72"
            />
            <div class="flex-1">
                <div class="text-xl mb2">早安，MD，祝你开心每一天！</div>
                <div class="color-s">交互专家 |某某某事业群－某某平台部－某某技术部－UED</div>
            </div>
            <div class="flex space-x4">
                <div v-for="(item, index) in summary" :key="index">
                    <div class="color-s mb2">
                        {{ item.title }}
                    </div>
                    <div class="text-xl">
                        {{ item.value }}
                    </div>
                </div>
            </div>
        </div>
        <div p-3>
            <el-row :gutter="24">
                <el-col :lg="16" class="space-y6">
                    <el-card shadow="never" :body-style="{ padding: 0 }" class="card-grid">
                        <template #header>
                            <div>
                                <span>进行中的项目</span>
                                <el-link type="primary" class="ml-auto"> 全部项目 </el-link>
                            </div>
                        </template>
                        <div class="grid md:grid-cols-2 lg:grid-cols-3">
                            <div v-for="i in 6" :key="i" class="p6">
                                <div class="items-center mb2">
                                    <el-avatar
                                        src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"
                                        size="small"
                                    />
                                    <a class="ml-3" href="#"> Alipay </a>
                                </div>
                                <div class="color-s h44px">
                                    那是一种内在的东西，他们到达不了，也无法触及的
                                </div>
                                <div class="color-s text-xs">
                                    <a class="flex-1" href="#">科学搬砖组</a>
                                    <span>9小时前</span>
                                </div>
                            </div>
                        </div>
                    </el-card>
                    <el-card shadow="never" header="动态" :body-style="{ padding: '0px 24px' }">
                        <div v-for="i in 6" :key="i" p="x6 y4" b="b-1" class="card-border">
                            <el-avatar
                                src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                                m="r4"
                                :size="32"
                            />
                            <div>
                                <div mb1>
                                    曲丽丽 在
                                    <a href="#" class="c-primary">高逼格设计天团</a> 新建项目
                                    <a href="#" class="c-primary">六月迭代</a>
                                </div>
                                <div class="color-s">几秒后</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :lg="8" class="space-y6">
                    <el-card shadow="never" header="快速开始 / 便捷导航">
                        <div class="grid grid-cols-4 gap-3 text-center">
                            <div v-for="i in 6" :key="i">
                                <el-link> 操作{{ i + 1 }} </el-link>
                            </div>
                            <div>
                                <el-link type="primary">
                                    <div i-ep-plus />
                                    添加
                                </el-link>
                            </div>
                        </div>
                    </el-card>

                    <el-card shadow="never" header="团队">
                        <div class="grid grid-cols-2 gap-4">
                            <div v-for="i in 6" :key="i">
                                <el-avatar
                                    src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                                    m="r2"
                                    size="small"
                                />
                                <el-link>高逼格设计天团</el-link>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
const summary = reactive([
    {
        title: '客户数',
        value: 9999
    },
    {
        title: '总销量',
        value: 283223
    },
    {
        title: '总销售额(元)',
        value: 37812
    }
])
</script>

<style lang="less" scoped>
:deep(.el-card__header) {
    font-size: 1rem;
}

.card-grid {
    overflow: visible;
    :deep(.el-card__header) {
        border-bottom: 0;
    }
    .grid {
        margin-left: -1px;
        & > div {
            box-shadow: 1px 0 0 0 rgb(0 0 0 / 6%), 0 1px 0 0 rgb(0 0 0 / 6%),
                1px 1px 0 0 rgb(0 0 0 / 6%), inset 1px 0 0 0 rgb(0 0 0 / 6%),
                inset 0 1px 0 0 rgb(0 0 0 / 6%);
            &:hover {
                box-shadow: var(--el-box-shadow);
            }
        }
    }
}

.color-s {
    color: var(--el-text-color-secondary);
}
.card-border {
    border-color: var(--el-border-color);
}
</style>
