<script setup lang="ts">
const ROWS = ref(14); // 纵向 14 格
const COLUMNS = ref(14); // 横向 14 格
// TODO 尺寸自适应
const WIDTH = ref(100);
const HEIGHT = ref(100);

enum ChessEnum {
  None,
  Black,
  White
}

// 15 x 15 交叉点
const state = ref<ChessEnum[][]>(
  Array(ROWS.value + 1)
    .fill(0)
    .map(_ => Array(COLUMNS.value + 1).fill(ChessEnum.None))
);

// 默认黑方先手
const isBlackTurn = ref(true);

// 落子
const onAddChess = (rowIndex: number, columnIndex: number) => {
  const currentState = state.value[rowIndex][columnIndex];
  // 已落子
  if (currentState !== ChessEnum.None) {
    return ElMessage.error(`Already a ${currentState === ChessEnum.Black ? 'black' : 'white'} chess here!`);
  }

  const winner = checkWinner();
  if (winner !== ChessEnum.None) {
    return ElMessage.success(`${winner === ChessEnum.Black ? 'Black' : 'White'} wins!`);
  }

  // 正常落子
  state.value[rowIndex][columnIndex] = isBlackTurn.value ? ChessEnum.Black : ChessEnum.White;
  // 切换回合
  isBlackTurn.value = !isBlackTurn.value;
};

// TODO 胜负判定
const checkWinner = () => {
  return ChessEnum.None;
};
</script>

<template>
  <div class="relative">
    <chess-layout class="absolute!"></chess-layout>

    <!-- 落棋识别区域 -->
    <template v-for="(row, rowIndex) in state" :key="rowIndex">
      <div
        v-for="(data, columnIndex) in row"
        :key="rowIndex + columnIndex"
        class="w-[100px] h-[100px] z-1 absolute cursor-pointer flex-center"
        :class="data !== ChessEnum.None && 'cursor-not-allowed'"
        @click="onAddChess(rowIndex, columnIndex)"
        :style="{top: `${(rowIndex + 1) * 100 - 50}px`, left: `${(columnIndex + 1) * 100 - 50}px`}"
      >
        <img
          v-if="data === ChessEnum.Black"
          src="/assets/images/black-chess.svg"
          alt="black chess"
          class="black-chess w-[80px] h-[80px]"
        />
        <img
          v-else-if="data === ChessEnum.White"
          src="/assets/images/white-chess.svg"
          alt="white chess"
          class="white-chess w-[80px] h-[80px]"
        />
        <!--        <img-->
        <!--          v-if="data === ChessEnum.Black"-->
        <!--          src="/assets/images/black-chess.svg"-->
        <!--          alt="black chess"-->
        <!--          class="black-chess w-[80px] h-[80px]"-->
        <!--        />-->
        <!--        <img-->
        <!--          v-else-if="data === ChessEnum.White"-->
        <!--          src="/assets/images/white-chess.svg"-->
        <!--          alt="white chess"-->
        <!--          class="white-chess w-[80px] h-[80px]"-->
        <!--        />-->
      </div>
    </template>
  </div>
</template>
