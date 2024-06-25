<script setup lang="ts">
const ROWS = ref(14);
const COLUMNS = ref(14);
const WIDTH = ref(100);
const HEIGHT = ref(100);

// 14 x 14
const state = Array(ROWS.value)
  .fill(0)
  .map(_ => Array(COLUMNS.value).fill(0));

const stars = [
  [3, 3],
  [3, 11],
  [7, 7],
  [11, 3],
  [11, 11]
];
</script>

<template>
  <div class="root w-[1600px] h-[1600px] flex-center mx-auto">
    <div class="chess-layout w-[1400px] h-[1400px] relative" flex flex-wrap>
      <template v-for="rowIndex in 14" :key="rowIndex">
        <div
          v-for="columnIndex in 14"
          :key="rowIndex + columnIndex"
          class="chess-item w-[100px] h-[100px] box-border flex-center"
        >
          {{ 14 * (rowIndex - 1) + columnIndex }}
        </div>
      </template>

      <!-- 中元及四星 -->
      <div
        v-for="[x, y] in stars"
        :key="x + y"
        class="w-[16px] h-[16px] rounded-[50%] bg-black absolute"
        :style="{
          left: `${y * 100}px`,
          top: `${x * 100}px`,
          transform: 'translate(-8px, -8px)'
        }"
      ></div>
      <!-- TODO 交叉点坐标 -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.root {
  border: 1px solid theme('colors.primary.black');
  background-color: theme('colors.primary.orange');
}

.chess-layout {
  background-color: theme('colors.primary.gray');
  .chess-item {
    border-top: 1px solid theme('colors.secondary.black');
    border-left: 1px solid theme('colors.secondary.black');
    // 最右侧一列右边框
    &:nth-child(14n) {
      border-right: 1px solid theme('colors.primary.black');
    }
    // 最底部一行下边框
    // 选中倒数第 14 个元素至最后一个元素
    // 14 + 5 = 19
    &:nth-last-child(-n + 19) {
      border-bottom: 1px solid theme('colors.primary.black');
    }
  }
}
</style>
