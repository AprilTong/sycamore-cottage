<template>
    <div style="width: 300px; height: 200px; border: 1px solid red">
        <canvas ref="canvas" class="jSignature" tabindex="0" @mousedown="onMouseDown" />
        <footer slot="footer" class="dialog-footer">
            <el-button type="danger" @click.native.prevent="clearPanel">清空签名</el-button>
            <el-button type="primary" @click="confirm">确认签名</el-button>
            <el-button @click.native.prevent="clearPanel">取消</el-button>
        </footer>
        <img class="imgCanvas" :src="imgUrl" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
export default defineComponent({
    name: 'environAmbitus',
    setup() {
        const canvas = ref()
        const imgUrl = ref()

        // 开始签名
        function onMouseDown(e: any) {
            const el = e.target || e.srcElement
            const ctx = el.getContext('2d')
            ctx.beginPath()
            ctx.moveTo(e.offsetX, e.offsetY)
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
            el.onmousemove = function (e: any) {
                if (e.which === 0) {
                    el.onmousemove = null
                    el.onmouseup = null
                    return
                }
                ctx.lineTo(e.offsetX, e.offsetY)
                ctx.stroke()
            }
            el.onmouseup = function () {
                el.onmousemove = null
                el.onmouseup = null
            }
            el.focus()
        }

        // 清空签名
        function clearPanel(e: any) {
            nextTick(() => {
                // const el = canvas;
                const ctx = canvas.value.getContext('2d')
                ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
            })
        }

        // 确认签名
        function confirm() {
            nextTick(() => {
                try {
                    // const canvas = this.$refs["canvas"];
                    const blank = document.createElement('canvas') // 创建一个空canvas对象
                    blank.width = canvas.value.width
                    blank.height = canvas.value.height
                    imgUrl.value = canvas.value.toDataURL()
                } catch (e) {
                    console.warn(e)
                }
            })
        }
        return { onMouseDown, confirm, clearPanel, canvas, imgUrl }
    }
})
</script>
