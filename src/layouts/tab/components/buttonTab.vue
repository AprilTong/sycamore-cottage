<template>
    <el-button class="tab-btn" :class="{ 'is-active': isActive }">
        <span text-sm>
            <slot></slot>
        </span>
        <div v-if="closable" pl-1>
            <closeIcon @click.stop="handleClose"></closeIcon>
        </div>
    </el-button>
</template>

<script setup lang="ts">
import closeIcon from './closeIcon.vue'

interface Props {
    /** 激活状态 */
    isActive?: boolean
    /** 是否显示关闭图标 */
    closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isActive: false,
    closable: true
})

interface Emits {
    /** 点击关闭图标 */
    (e: 'close'): void
}

const emit = defineEmits<Emits>()

function handleClose() {
    emit('close')
}
</script>
<style lang="less" scoped>
.is-active {
    color: var(--el-button-active-text-color);
    border-color: var(--el-button-active-border-color);
    background-color: var(--el-button-active-bg-color);
    outline: 0;
}
.tab-btn {
    padding: 8px 12px;
}
</style>
