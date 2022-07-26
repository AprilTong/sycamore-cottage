<!-- <template>
    <div class="input tags-wrap" v-click-outside="onClickOutside">
        <div class="tags" transition="tags" v-for="(item, index) in dis_source">
            <span class="content">{{ item }}</span>
            <span class="del" @click="delOne(index)">&times;</span>
        </div>
        <input
            class="tags-input"
            type="text"
            placeholder="标签，按 enter 创建"
            v-model="text"
            @keyup.enter="add(text)"
            @keydown.delete="del"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
export default defineComponent({
    directives: { vClickOutside },
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
        width: 10em;
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
</style> -->
<template>
    <div class="con">
        <div v-for="item in list" class="one" :key="item.id">
            <span v-if="!item.isEdit" class="label">
                {{ item.label }}
            </span>
            <el-input
                v-else
                v-model="item.label"
                @blur="blur(item)"
                :ref="inputRefs"
                class="flex"
            ></el-input>
            <span @click="edit(item)" class="edit">编辑</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, nextTick } from 'vue'
let itemRefs: any[] = []
const inputRefs = (el: any) => {
    if (el) {
        itemRefs.push(el)
    }
}
const list = reactive([
    {
        isEdit: false,
        label: '数据1',
        id: 1
    },
    {
        isEdit: false,
        label: '数据2',
        id: 2
    }
])
const edit = (item: any) => {
    item.isEdit = true
    nextTick(() => {
        itemRefs[itemRefs.length - 1].select()
    })
}
const blur = (item: any) => {
    console.log('blur', item)
    item.isEdit = false
}
</script>
<style lang="less">
.con {
    margin: 50px;
    .one {
        height: 30px;
        display: flex;
        width: 200px;
        background-color: #fff;
        align-items: center;
        margin-top: 5px;
        .flex {
            flex: 1;
        }
    }
    .label {
        width: 50px;
    }
    .edit {
        cursor: pointer;
        color: blue;
    }
}
</style>
