<template>
  <div class="wrap">
    <wrap :id="'-1'" @drop="handleDrop">
      <template v-for="(item, index) in menuList" :key="item.id">
        <menuCard :id="item.id" :index="index" :move-card="moveFirstMenu" :first-menu="true">
          <menuItem v-if="!item.child" :item="item"></menuItem>
          <wrap v-else :id="item.id">
            <div>
              <span class="second-menu" @click="item.expand = !item.expand">{{ item.name }}</span>
              <template v-if="item.expand">
                <template v-for="(child, cIndex) in item.child" :key="cIndex">
                  <menuCard
                    :id="item.id"
                    :index="cIndex"
                    :move-card="moveSecondMenu"
                    :first-menu="false"
                  >
                    <menuItem :item="child" class="second"></menuItem>
                  </menuCard>
                </template>
              </template>
            </div>
          </wrap>
        </menuCard>
      </template>
    </wrap>
  </div>
</template>
<script lang="ts" setup>
import wrap from './menu/wrap.vue'
import menuCard from './menu/menuCard.vue'
import menuItem from './menu/menuItem.vue'

const menuList = reactive([
  {
    id: '1',
    name: '工作表1'
  },
  {
    id: '2',
    name: '分类1',
    expand: false,
    child: [
      {
        id: '2-1',
        name: '分类1工作表1'
      },
      {
        id: '2-2',
        name: '分类1工作表2'
      }
    ]
  },
  {
    id: '3',
    name: '工作表2'
  },
  {
    id: '4',
    name: '分类2',
    expand: false,
    child: [
      {
        id: '4-1',
        name: '分类2工作表1'
      },
      {
        id: '4-2',
        name: '分类2工作表2'
      }
    ]
  },
  {
    id: '5',
    name: '工作表3'
  }
])
const moveFirstMenu = (dragIndex: number, hoverIndex: number) => {
  console.log('11')
  const item = menuList[dragIndex]
  menuList.splice(dragIndex, 1)
  menuList.splice(hoverIndex, 0, item)
}
const moveSecondMenu = (dragIndex: number, hoverIndex: number) => {
  console.log('123')
}
const handleDrop = () => {}
</script>
<style lang="less" scoped>
.wrap {
  background-color: #fff;
  padding: 20px;
  .second-menu {
    cursor: pointer;
  }
  .second {
    padding-left: 20px;
  }
}
</style>
