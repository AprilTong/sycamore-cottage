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
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
const state = reactive({
    fileList: []
})
const test = () => {
    console.log('123', state.fileList)
}
</script>
