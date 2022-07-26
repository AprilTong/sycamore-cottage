<template>
    <el-upload
        class="upload-demo"
        multiple
        :limit="3"
        :file-list="state.fileList"
        :http-request="test"
        :auto-upload="false"
    >
        <el-button type="primary">Click to upload</el-button>
    </el-upload>

    <el-button @click="test">测试</el-button>
</template>
<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import Icon from './icon.vue'

const state = reactive({
    fileList: [],
    tag: '',
    tags: []
})
const test = () => {
    console.log('123', state.fileList)
}

const route = useRoute()
const router = useRouter()
const go = () => {
    let id = 123
    router.push({
        path: `/upload/${id}`
    })
    console.log(route.params)
}
onMounted(() => {
    ElNotification({
        icon: Icon,
        // type: 'info',
        duration: 0,
        dangerouslyUseHTMLString: true,
        message: `<strong>正在生成导出文件</strong><br/><div class="promote">可能需要一段时间，您可以进行其他操作，完成后将会通知您</div>`,
        customClass: 'dowloading-notify',
        position: 'bottom-left'
    })
})
</script>
