<script setup lang="ts">
const ROWS = ref(14);
const COLUMNS = ref(14);
// TODO 尺寸自适应
const WIDTH = ref(100);
const HEIGHT = ref(100);

// 中元及四星位
const stars = [
  [3, 3],
  [3, 11],
  [7, 7],
  [11, 3],
  [11, 11]
];

/**
 * 生成 start-end 且步长为 step 的数组, 左右均包含
 * @param start 起始值
 * @param end 终止值
 * @param step 步长, 默认值 1
 */
const arrowRange = (start: number, end: number, step: number = 1) =>
  Array.from({length: (end - start) / step + 1}, (v, i) => start + i * step);

// 大写字母表 Alphabet 字符数组
const Alphabet = arrowRange('A'.charCodeAt(0), 'Z'.charCodeAt(0)).map(i => String.fromCharCode(i));

// 1~15 行
const ROW_NUMBERS = Array(ROWS.value + 1)
  .fill(0)
  .map((_, index) => index + 1);
// A~O 列
const COLUMN_NUMBERS = Alphabet.slice(0, COLUMNS.value + 1);
</script>

<template>
  <div class="chess-layout w-[1600px] h-[1600px] flex-center mx-auto relative">
    <div class="top-left absolute"></div>
    <div class="top-right absolute"></div>
    <div class="bottom-left absolute"></div>
    <div class="bottom-right absolute"></div>

    <!-- 列索引 A-O 自左向右排列-->
    <div
      v-for="(column, columnIndex) in COLUMN_NUMBERS"
      :key="column"
      class="chess-column-label absolute w-[25px] h-[25px] flex-center bottom-[60px] c-white b b-solid b-red rounded-[50%]"
      :style="{left: `${(columnIndex + 1) * 100 - 10}px`}"
    >
      {{ column }}
    </div>
    <!-- 行索引 1-15 自下而上排列-->
    <div
      v-for="(row, rowIndex) in ROW_NUMBERS"
      :key="row"
      class="chess-row-label absolute w-[25px] h-[25px] flex-center right-[60px] c-white b b-solid b-red rounded-[50%]"
      :style="{bottom: `${(rowIndex + 1) * 100 - 10}px`}"
    >
      {{ row }}
    </div>

    <div class="chess-cell w-[1400px] h-[1400px] relative" flex flex-wrap>
      <template v-for="rowIndex in 14" :key="rowIndex">
        <div
          v-for="columnIndex in 14"
          :key="rowIndex + columnIndex"
          class="chess-cell-item w-[100px] h-[100px] flex-center"
        >
          <!-- {{ 14 * (rowIndex - 1) + columnIndex }} -->
        </div>
      </template>

      <!-- 中元及四星位 -->
      <div
        v-for="[x, y] in stars"
        :key="x + y"
        class="chess-star w-[16px] h-[16px] rounded-[50%] bg-black absolute"
        :style="{
          left: `${y * 100}px`,
          top: `${x * 100}px`,
          transform: 'translate(-8px, -8px)'
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chess-layout {
  $border-thin: 1px;
  $border-bold: 3px;
  $indent-size: 15px;
  border: 1px solid theme('colors.primary.black');
  background-color: theme('colors.primary.orange');

  &::before {
    content: ' ';
    width: calc(1600px - 2 * $indent-size);
    height: calc(1600px - 2 * $indent-size);
    border: $border-thin solid theme('colors.secondary.black');
    @apply absolute-center;
  }

  &::after {
    content: ' ';
    width: calc(1600px - 4 * $indent-size);
    height: calc(1600px - 4 * $indent-size);
    border: $border-thin solid theme('colors.secondary.black');
    @apply absolute-center;
  }

  // 左上角 ⅃
  .top-left {
    top: $indent-size;
    left: $indent-size;
    width: calc(2 * $indent-size);
    height: calc(2 * $indent-size);
    border-bottom: $border-thin solid theme('colors.secondary.black');
    border-right: $border-thin solid theme('colors.secondary.black');
  }

  // 右上角 L
  .top-right {
    top: $indent-size;
    right: $indent-size;
    width: calc(2 * $indent-size);
    height: calc(2 * $indent-size);
    border-bottom: $border-thin solid theme('colors.secondary.black');
    border-left: $border-thin solid theme('colors.secondary.black');
  }

  // 左下角 ⅂
  .bottom-left {
    bottom: $indent-size;
    left: $indent-size;
    width: calc(2 * $indent-size);
    height: calc(2 * $indent-size);
    border-top: $border-thin solid theme('colors.secondary.black');
    border-right: $border-thin solid theme('colors.secondary.black');
  }

  // 右下角 |_
  .bottom-right {
    bottom: $indent-size;
    right: $indent-size;
    width: calc(2 * $indent-size);
    height: calc(2 * $indent-size);
    border-top: $border-thin solid theme('colors.secondary.black');
    border-left: $border-thin solid theme('colors.secondary.black');
  }

  .chess-cell {
    background-color: theme('colors.primary.gray');

    &-item {
      border-top: $border-thin solid theme('colors.secondary.black');
      border-left: $border-thin solid theme('colors.secondary.black');

      // 最右侧一列右边框
      &:nth-child(14n) {
        border-right: $border-bold solid theme('colors.primary.black');
      }

      // 最底部一行下边框
      // 选中倒数第 14 个元素至最后一个元素
      // 14 + 5 = 19
      &:nth-last-child(-n + 19) {
        border-bottom: $border-bold solid theme('colors.primary.black');
      }

      // 最顶部一行上边框
      &:nth-child(-n + 14) {
        border-top: $border-bold solid theme('colors.primary.black');
      }

      // 最左侧一列左边框
      &:nth-child(14n + 1) {
        border-left: $border-bold solid theme('colors.primary.black');
      }
    }
  }
}
</style>
