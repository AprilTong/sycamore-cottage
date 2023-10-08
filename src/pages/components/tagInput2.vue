<template>
  <div class="input tags-wrap">
    <div v-for="(item, index) in dis_source" :key="index" class="tags" transition="tags">
      <span class="content">{{ item }}</span>
      <span class="del" @click="delOne(index)">&times;</span>
    </div>
    <input
      v-model="text"
      class="tags-input"
      type="text"
      placeholder="请输入"
      @keyup.enter="add(text)"
      @keydown.delete="del"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      text: '',
      dis_source: ['april', 'bran']
    })
    const add = (text: string) => {
      if (text) {
        state.dis_source.push(text)
        state.text = ''
      }
    }
    const del = () => {
      if (!state.text) {
        state.dis_source.pop()
      }
    }
    const delOne = (index: number) => {
      state.dis_source.splice(index, 1)
    }
    const onClickOutside = () => {
      console.log('1234')
    }

    return {
      ...toRefs(state),
      add,
      del,
      delOne,
      onClickOutside
    }
  }
})
</script>
<style lang="less" scoped>
.tags-wrap {
  width: 200px;
  height: fit-content;
  outline: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px;
  padding: 4px 7px;
  line-height: 1;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  input {
    width: 45px;
    padding: 4px 7px;
    height: 28px;
    line-height: 1;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: text;
    font-size: 14px;
    color: #666;
    background: #fff;
    outline: 0;
    -webkit-appearance: none;
    font-size: 14px;
    padding: 0;
    background-color: inherit;
    border: none;
    color: inherit;
  }
  .tags {
    position: relative;
    float: left;
    color: #333;
    line-height: 22px;
    margin: 0 4px 4px 0;
    padding: 0 22px 0 10px;
    border-radius: 6px;
    background-color: #e0e0e0;
    height: 22px;
    .content {
      line-height: 22px;
    }
    .del {
      width: 22px;
      height: 22px;
      text-align: center;
      cursor: pointer;
      position: absolute;
      top: -1px;
      right: 0;
    }
  }
}
</style>
