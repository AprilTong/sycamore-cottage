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
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
</script>
