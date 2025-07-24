<template>
  <div class="shadow-dom-wrap">
    <div ref="hostRef"></div>
    <span>I'm not in the shadow DOM</span>
    <div>
      <el-button @click="handleClick">将span标签内容转为大写</el-button>
      <el-button @click="handleChangeShadowDom">更改shadow dom中span标签内容</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const hostRef = ref<HTMLDivElement>()
const initData = () => {
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(`
    span {
        color: red;
    }
  `)
  const shadow = hostRef.value?.attachShadow({ mode: 'open' })
  shadow?.adoptedStyleSheets.push(sheet)
  const span = document.createElement('span')
  span.textContent = 'Hello, shadow dom'
  shadow?.appendChild(span)
}

onMounted(() => {
  initData()
})

const handleClick = () => {
  const spans = document.querySelectorAll('span')
  spans.forEach((span) => {
    if (span.textContent) {
      span.textContent = span.textContent.toUpperCase()
    }
  })
}
const handleChangeShadowDom = () => {
  const span = hostRef.value?.shadowRoot?.querySelector('span')
  if (span && span.textContent) {
    span.textContent = span.textContent.toUpperCase()
  }
}
</script>
<style lang="scss" scoped>
span {
  color: blue;
}
</style>
