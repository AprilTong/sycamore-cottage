<template>
  <div class="tree-table-wrap">
    <h3 class="title">基于vxe-table+Sortable的树形表格行拖动</h3>
    <vxe-table
      ref="tableRef"
      border
      :column-config="{ resizable: true }"
      :row-config="{ useKey: true, keyField: 'id' }"
      :tree-config="{}"
      :data="tableData"
    >
      <vxe-column width="80">
        <i class="iconfont icon-move move"></i>
      </vxe-column>
      <vxe-column field="name" title="Name" tree-node></vxe-column>
      <vxe-column field="size" title="Size"></vxe-column>
      <vxe-column field="type" title="Type"></vxe-column>
      <vxe-column field="date" title="Date"></vxe-column>
    </vxe-table>
  </div>
</template>
<script lang="ts" setup>
import Sortable from 'sortablejs'
import { isEqual, cloneDeep } from 'lodash-es'

interface RowVO {
  id: number
  name: string
  type: string
  size: number
  date: string
  children?: RowVO[]
  parentId?: number
  selfIndex?: string
}
const tableRef = ref()
const sortTable = ref(null) as null | any
const tableData = ref<RowVO[]>([
  { id: 1000, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
  {
    id: 1005,
    name: 'Test2',
    type: 'mp4',
    size: 0,
    date: '2021-04-01',
    children: [
      { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
      {
        id: 20045,
        name: 'test abc4',
        type: 'html',
        size: 600,
        date: '2021-04-01',
        children: [
          { id: 21111, name: 'Test9', type: 'pdf', size: 512, date: '2020-01-01' },
          { id: 22201, name: 'Test10', type: 'js', size: 1024, date: '2021-06-01' }
        ]
      },
      {
        id: 10053,
        name: 'test abc96',
        type: 'avi',
        size: 0,
        date: '2021-04-01'
      }
    ]
  },
  {
    id: 23666,
    name: 'Test8',
    type: 'xlsx',
    size: 2048,
    date: '2020-11-01',
    children: [
      { id: 24330, name: 'test abc5', type: 'txt', size: 25, date: '2021-10-01' },
      { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
      { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
    ]
  },
  { id: 24555, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
])
const createTableSort = () => {
  const el = document.querySelector('.body--wrapper>.vxe-table--body tbody') as HTMLElement
  if (!el) return
  if (sortTable.value) return
  sortTable.value = Sortable.create(el, {
    disabled: false, // 是否开启拖拽
    animation: 150, // 拖拽延时，效果更好看
    handle: '.icon-move',
    sort: true,
    onMove: (evt: any) => {
      const { dragged, related } = evt

      const dragElClassList: string[] = []
      dragged.classList.forEach((element: string) => {
        if (element.includes('row--level')) {
          dragElClassList.push(element)
        }
      })

      const relatelClassList: string[] = []
      related.classList.forEach((element: string) => {
        if (element.includes('row--level')) {
          relatelClassList.push(element)
        }
      })
      // 不同层级的不能互相拖动
      // 这里采用比较笨的方法实现,大佬们指点一下有什么更好的实现
      if (!isEqual(dragElClassList, relatelClassList)) return false
      return true
    },
    onEnd: (evt: any) => {
      const { newIndex, oldIndex } = evt
      if (newIndex === oldIndex) return
      const expandRow = tableRef.value.getTreeExpandRecords()
      // 展开的数据id
      const expandId = expandRow.map((item: RowVO) => item.id)
      const newTable: any[] = []
      // 将多维数据展开存为一维数据
      const cloneData = tableData.value.map((o) => o)
      let count = -1
      const result: any = {}
      const getMap = (data: any[], parentIndex = '') => {
        data.forEach((item, index) => {
          // 如果有子类，将子类也push进去
          item.selfIndex = parentIndex === '' ? `${index}` : `${parentIndex}-${index}`
          result[++count] = item.selfIndex
          if (expandId.includes(item.id) && item.children && item.children.length > 0) {
            getMap(item.children, item.selfIndex)
          }
        })
      }
      getMap(cloneData)
      // 交换对应的
      const oldRealIndex = result[oldIndex]
      const newRealIndex = result[newIndex]
      if (oldRealIndex.length === 1 && newRealIndex.length === 1) {
        const currRow = cloneDeep(tableData.value[oldRealIndex])
        tableData.value?.splice(oldRealIndex, 1)
        tableData.value?.splice(newRealIndex, 0, currRow)
      } else {
        const parentIndex = oldRealIndex.slice(0, -2)
        const tempOldIndex = oldRealIndex.slice(oldRealIndex.length - 1)
        const tempNewIndex = newRealIndex.slice(oldRealIndex.length - 1)
        const getCurrent = (arr: RowVO[]) => {
          arr.forEach((item) => {
            if (item.selfIndex === parentIndex && item.children?.length) {
              const currRow = item.children[tempOldIndex]
              item.children?.splice(tempOldIndex, 1)
              item.children?.splice(tempNewIndex, 0, currRow)
            }
            if (item.children?.length) {
              getCurrent(item.children)
            }
          })
        }
        getCurrent(tableData.value)
      }

      console.log('tableData', tableData.value)
      // 赋值到数据,可以传给后端
      tableRef.value.reloadData(tableData.value)
      nextTick(() => {
        tableRef.value.setTreeExpand(expandRow, true)
      })
    }
    // onEnd: async (evt: any) => {
    //   const { newIndex, oldIndex } = evt
    //   if (newIndex === oldIndex) return
    //   const expandRow = tableRef.value.getTreeExpandRecords()
    //   // 展开的数据id
    //   const expandId = expandRow.map((item: RowVO) => item.id)
    //   const newTable: any[] = []
    //   // 将多维数据展开存为一维数据
    //   const cloneData = tableData.value.map((o) => o)
    //   cloneData.forEach((item) => {
    //     // 如果有子类，将子类也push进去
    //     if (expandId.includes(item.id) && item.children && item.children.length > 0) {
    //       newTable.push({
    //         ...item,
    //         useChild: false
    //       })
    //       item.children.forEach((i) => {
    //         i.parentId = item.id
    //         newTable.push(i)
    //       })
    //     } else {
    //       newTable.push({
    //         ...item,
    //         useChild: true
    //       })
    //     }
    //   })
    //   const currRow = cloneDeep(newTable[oldIndex])
    //   newTable?.splice(oldIndex, 1)
    //   newTable?.splice(newIndex, 0, currRow)
    //   // 然后把排序成功后的一维数据转为树形数据
    //   const result: any[] = []
    //   newTable.forEach((item) => {
    //     // 一级
    //     if (!item.parentId) {
    //       // 设置子级
    //       if (!item.useChild) {
    //         item.children = newTable.filter((one) => one.parentId === item.id)
    //       }
    //       result.push(item)
    //     }
    //   })
    //   // 赋值到数据,可以传给后端
    //   tableData.value = result
    //   nextTick(() => {
    //     tableRef.value.reloadData(result)
    //     nextTick(() => {
    //       tableRef.value.setTreeExpand(expandRow, true)
    //     })
    //   })
    // }
  })
}
onMounted(() => {
  nextTick(() => {
    createTableSort()
  })
})
defineOptions({
  name: 'TableTree'
})
</script>
<style lang="less" scoped>
.tree-table-wrap {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 10px;
  overflow: scroll;
  .title {
    margin-bottom: 8px;
  }
  .move {
    cursor: pointer;
    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
