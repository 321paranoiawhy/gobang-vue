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

// 15 x 15 交叉点状态
const state = ref<ChessEnum[][]>(
  Array(ROWS.value + 1)
    .fill(0)
    .map(_ => Array(COLUMNS.value + 1).fill(ChessEnum.None))
);

// 各棋子相应的步数, 默认全为 0, 范围为 1~225
const chessStep = ref<number[][]>(
  Array(ROWS.value + 1)
    .fill(0)
    .map(_ => Array(COLUMNS.value + 1).fill(0))
);

// 默认黑方先手
const isBlackTurn = ref(true);

// 当前步数
let currentSteps = 0;

const fps = useFps();

const useChess = useChessStore();

const watermarkFontStyle = ref({
  fontSize: 12,
  color: 'rgba(0, 0, 0, .15)'
});

// 落子
const onPutChess = (rowIndex: number, columnIndex: number) => {
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
  // 尽管可能无需在棋子上显示步数, 但为了记录和复盘, 仍需保留步数数据
  currentSteps++;
  chessStep.value[rowIndex][columnIndex] = currentSteps;
};

// TODO 胜负判定
const checkWinner = () => {
  return ChessEnum.None;
};
</script>

<template>
  <!--  TODO 避免重渲染 -->
  <el-watermark
    :key="useChess.withWatermark"
    :content="useChess.withWatermark ? ['Gobang', 'Ninja'] : ''"
    :font="watermarkFontStyle"
  >
    <div class="relative w-[1600px] h-[1600px]">
      <chess-layout class="absolute!"></chess-layout>

      <div class="absolute top-[50px] right-[50px] c-white">FPS: {{ fps }}</div>

      <!-- 落棋识别区域 -->
      <template v-for="(row, rowIndex) in state" :key="rowIndex">
        <div
          v-for="(data, columnIndex) in row"
          :key="rowIndex + columnIndex"
          class="w-[100px] h-[100px] z-1 absolute cursor-pointer flex-center"
          :class="data !== ChessEnum.None && 'cursor-not-allowed'"
          @click="onPutChess(rowIndex, columnIndex)"
          :style="{top: `${(rowIndex + 1) * 100 - 50}px`, left: `${(columnIndex + 1) * 100 - 50}px`}"
        >
          <img
            v-if="data === ChessEnum.Black"
            src="/assets/images/black-chess.svg"
            alt="black chess"
            class="black-chess w-[60px] h-[60px]"
          />
          <img
            v-else-if="data === ChessEnum.White"
            src="/assets/images/white-chess.svg"
            alt="white chess"
            class="white-chess w-[60px] h-[60px]"
          />
          <span
            v-if="data !== ChessEnum.None && useChess.withNumberInChess && chessStep[rowIndex][columnIndex]"
            class="absolute flex-center z-2"
            :class="data === ChessEnum.Black ? 'c-white' : 'c-black'"
          >
            {{ chessStep[rowIndex][columnIndex] }}
          </span>
        </div>
      </template>
    </div>
  </el-watermark>
</template>
