<template>
  <div class="timer-wrap">
    <h2>将鼠标悬停在下面的框上即可查看倒计时</h2>
    <div class="timer"></div>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped>
@property --n {
  syntax: '<integer>';
  inherits: false;
  initial-value: 0;
}
@keyframes count {
  from {
    --n: 5;
  }
  to {
    --n: 0;
  }
}
.timer-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.timer:hover::after {
  animation: 5s linear count;
  /* 设置 CSS 动画在执行之前和之后如何将样式应用于其目标。 */
  animation-fill-mode: forwards;
  counter-reset: n calc(0 + var(--n));
  content: counter(n);
}
.timer::after {
  display: block;
  content: '';
  line-height: 200px;
  height: 200px;
  font-size: 92pt;
  text-align: center;
  border: 1px dashed black;
}
.timer {
  width: 200px;
  background-color: #fff;
}
</style>
