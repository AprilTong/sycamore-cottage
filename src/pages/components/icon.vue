<template>
  <div class="test" :data-value="dataValue">
    <el-popover v-model:visible="visible" placement="bottom" :width="200" trigger="click">
      <template #reference>
        <el-button class="m-2">{{ content }}</el-button>
      </template>
      <div v-for="item in list" :key="item.id" @click="click(item)">{{ item.label }}</div>
    </el-popover>
    <span class="interval">的</span>
    <el-cascader v-model="cascaderValue" :options="options" />
  </div>
</template>
<script setup lang="ts">
import { ElButton, ElPopover, ElCascader } from 'element-plus'

const props = defineProps({
  current: {
    type: Object,
    required: true,
    default: () => {
      return {
        id: '',
        label: ''
      }
    }
  }
})

const visible = ref(false)

const content = ref('1')
const contentId = ref('1')
const cascaderValue = ref('')
const list = ref([
  {
    label: '内容1',
    id: 1
  },
  {
    label: '内容2',
    id: 2
  },
  {
    label: '内容3',
    id: 3
  }
])
const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines'
      },
      {
        value: 'navigation',
        label: 'Navigation'
      }
    ]
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic'
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio'
          },
          {
            value: 'checkbox',
            label: 'Checkbox'
          }
        ]
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table'
          },
          {
            value: 'tag',
            label: 'Tag'
          }
        ]
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu'
          }
        ]
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog'
          }
        ]
      }
    ]
  }
]
onMounted(() => {
  const { id, label } = props.current
  content.value = label
  contentId.value = id
  if (options[0].children) {
    cascaderValue.value = options[0].children[0]?.value
  } else {
    cascaderValue.value = options[0].value
  }
})
const click = (item: any) => {
  content.value = item.label
  contentId.value = item.id
  visible.value = false
}
const dataValue = computed(() => {
  return `${contentId.value}+${cascaderValue.value}`
})
</script>
<style lang="less">
.test {
  display: inline-block;
  .interval {
    color: #999;
    padding: 3px;
  }
  .el-cascader {
    width: 150px;
    span {
      padding: 0px;
    }
  }
}
</style>
