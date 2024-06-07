<template>
  <div>
    <h3>has实现动态展示标题</h3>
    <div class="figure-wrap">
      <el-checkbox v-model="showCaption">展示标题</el-checkbox>
      <!-- <figure :class="[showCaption ? 'with-caption' : '']"> -->
      <figure>
        <img class="img" src="@/assets/images/logo.jpeg" alt="" />
        <figcaption v-if="showCaption">A great looking tart.</figcaption>
      </figure>
    </div>
    <h3>前一个兄弟选择器</h3>
    <div class="pre-sibling-wrap">
      <div class="book"></div>
      <div class="book"></div>
      <div class="book"></div>
      <div class="frame"></div>
      <div class="book"></div>
      <div class="book"></div>
      <div class="book"></div>
    </div>
    <h3>带图像的卡片</h3>
    <div class="card-img-wrap">
      <el-checkbox v-model="showImg">展示图片</el-checkbox>
      <div class="card">
        <img v-if="showImg" src="@/assets/images/login_human.png" alt="" />
        <div class="card-content">
          <span>.card:has(> img)</span>
          <i :class="['iconfont', showImg ? 'icon-success' : 'icon-fail']"></i>
        </div>
      </div>
    </div>
    <h3>图像是直接子元素</h3>
    <div class="card-direct-img">
      <el-checkbox v-model="showDirectImg">展示card-thumb</el-checkbox>
      <div class="card">
        <div v-if="!showDirectImg" class="card-thumb">
          <img src="@/assets/images/login_human.png" alt="" />
        </div>
        <img v-else src="@/assets/images/login_human.png" alt="" />
        <div class="card-content">
          <span>.card:has(> img)</span>
          <i :class="['iconfont', !showDirectImg ? 'icon-success' : 'icon-fail']"></i>
        </div>
      </div>
    </div>
    <h3>不带图片的卡片</h3>
    <div class="card-without-img">
      <el-checkbox v-model="withOutImg">不展示图片</el-checkbox>
      <div class="card">
        <img v-if="!withOutImg" src="@/assets/images/login_human.png" alt="" />
        <div class="card-content">
          <span>.card:not(:has(img))</span>
          <i :class="['iconfont', withOutImg ? 'icon-success' : 'icon-fail']"></i>
        </div>
      </div>
    </div>
    <h3>动态菜单布局</h3>
    <div class="dynamic-menu">
      <el-button @click="handleAddMenu">添加菜单</el-button>
      <el-button :disabled="removeDisabled" @click="handleRemoveMenu">删除菜单</el-button>
      <ul class="submenu">
        <li v-for="menu in menuList" :key="menu">
          <a href="#">Item {{ menu }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const showCaption = ref(false)
const showImg = ref(false)
const showDirectImg = ref(false)
const withOutImg = ref(false)
const menuList = ref([1, 2, 3, 4])
const removeDisabled = computed(() => {
  return menuList.value.length === 4
})
const handleRemoveMenu = () => {
  menuList.value.pop()
}
const handleAddMenu = () => {
  const last = menuList.value[menuList.value.length - 1]
  menuList.value.push(last + 1)
}
</script>
<style lang="less" scoped>
.figure-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2196f317;
  padding: 1rem;
  border-radius: 8px;
  min-height: 180px;
  .img {
    width: 300px;
    height: 300px;
  }
}
figure.with-caption {
  padding: 0.5rem;
  background-color: #fff;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

figure:has(figcaption) {
  padding: 0.5rem;
  background-color: #fff;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.pre-sibling-wrap {
  display: flex;
  align-items: end;
  justify-content: center;
  background-color: #2196f317;
  padding: 50px 0px;
  .frame {
    width: 75px;
    height: 100px;
    border: 5px solid #222;
    box-shadow: 0 3px 10px #00000026;
    margin-right: 10px;
  }
  .book {
    width: 22px;
    height: 80px;
    opacity: 0.2;
    background-color: rgb(47, 145, 244);
    margin-right: 10px;
    border-radius: 5px;
  }
  .book:has(+ .frame) {
    opacity: 1;
  }
}
.card-img-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2196f317;
  padding: 20px 0px;

  img {
    width: 200px;
    height: 200px;
  }
  .card {
    text-align: center;
    .card-content {
      i {
        color: red;
      }
    }
  }
  .card:has(img) {
    .card-content {
      span {
        font-weight: bold;
        color: #2f91f4;
      }
      i {
        color: green;
      }
    }
  }
}
.card-direct-img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2196f317;
  padding: 20px 0px;

  img {
    width: 200px;
    height: 200px;
  }
  .card {
    text-align: center;
    .card-content {
      i {
        color: red;
      }
    }
  }
  .card:has(> img) {
    .card-content {
      span {
        font-weight: bold;
        color: #2f91f4;
      }
      i {
        color: green;
      }
    }
  }
}
.card-without-img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2196f317;
  padding: 20px 0px;

  img {
    width: 200px;
    height: 200px;
  }
  .card {
    text-align: center;
    .card-content {
      i {
        color: red;
      }
    }
  }
  .card:not(:has(img)) {
    .card-content {
      span {
        font-weight: bold;
        color: #2f91f4;
      }
      i {
        color: green;
      }
    }
  }
}
.dynamic-menu {
  .submenu {
    margin-top: 5px;
    border-radius: 5px;
    background-color: #fff;
    width: fit-content;
    padding: 10px 20px;
  }
  /* 6+ items */
  .submenu:has(li:nth-last-child(n + 6)) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 250px;
  }

  /* 8+ items */
  .submenu:has(li:nth-last-child(n + 8)) {
    grid-template-columns: 1fr 1fr 1fr;
    width: 350px;
  }
}
</style>
