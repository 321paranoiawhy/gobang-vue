<script setup lang="ts">
import {ChessEnum} from '~/types/chess';
import ChessboardDom from '~/components/layouts/chessboard-dom.vue';
import type {ComputedRef} from 'vue';

const ROWS = ref(14); // 纵向 14 格
const COLUMNS = ref(14); // 横向 14 格
// TODO 尺寸自适应
const WIDTH = ref(100);
const HEIGHT = ref(100);

// 棋盘初始状态
const initialState: ChessEnum[][] = Array(ROWS.value + 1)
  .fill(0)
  .map(_ => Array(COLUMNS.value + 1).fill(ChessEnum.None));

// 15 x 15 交叉点状态
// const state = ref<ChessEnum[][]>(useCloned(initialState));
const state = useCloned(initialState).cloned;

// currentStep 悔棋或撤销悔棋只需改变 currentStep 即可
// state.slice(0, currentStep)[x, y].chess
// step, position, state
const mock = [{position: [0, 0], chess: ChessEnum.None}];

const mockState = ref(new Map<string, ChessEnum>());
mockState.value.set('3-4', ChessEnum.Black);
mockState.value.set('3-5', ChessEnum.White);
// for [key, value] in mockState.entries
// how to clone

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
// 落棋历史, 以实现悔棋、撤销悔棋功能
let chessHistory = [];

/**
 * 重置游戏
 */
const resetGame = () => {
  isBlackTurn.value = true;
  currentSteps = 0;
  chessHistory = [];
  state.value = useCloned(initialState).cloned.value;
};

// 悔棋
const undo = () => {
  currentSteps--;
};

// 撤销悔棋
const redo = () => {
  currentSteps++;
};

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

  const winner = checkWinner(rowIndex, columnIndex, isBlackTurn.value);
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

const FOUR = 4;

/**
 * 由列索引获取该列数据
 * @param columnIndex
 * @param start 起始行 (包含), 默认为 0
 * @param end 终止行 (不包含), 默认为 ROWS
 */
const getColumnByIndex = (columnIndex: number, start = 0, end = ROWS.value): ChessEnum[] => {
  const _start = start < 0 ? 0 : start;
  const _end = end > ROWS.value ? ROWS.value : end;

  if (_start > _end) {
    return [];
  } else {
    const result: ChessEnum[] = [];
    for (let rowIndex = _start; rowIndex <= _end; rowIndex++) {
      result.push(state.value[rowIndex][columnIndex]);
    }
    return result;
  }
};

const getLeftDiagonal = (rowIndex: number, columnIndex: number): ChessEnum[] => {
  // 左上角顶点 [0, y] // rowIndex - 0 = columnIndex - y => y = columnIndex - rowIndex
  // 中间点 [i, i + columnIndex - rowIndex]
  // 当前点 [rowIndex, columnIndex]
  // 中间点 [j + rowIndex - columnIndex, j]
  // 右下角顶点 [x, 14] // x - rowIndex = 14 - columnIndex => x = 14 + rowIndex - columnIndex

  const result = [];

  // 左上角
  for (let i = 0; i < rowIndex; i++) {
    console.log(i, i + columnIndex - rowIndex);
    result.push(state.value[i][i + columnIndex - rowIndex]);
  }

  // 右下角
  for (let j = columnIndex; j <= 14; j++) {
    console.log(j + rowIndex - columnIndex, j);
    result.push(state.value[j + rowIndex - columnIndex][j]);
  }

  return result;
};

const getRightDiagonal = (rowIndex: number, columnIndex: number): ChessEnum[] => {
  // 右上角顶点 [x, 0] // rowIndex - x = columnIndex - 0 => x = rowIndex - columnIndex
  // 中间点 [i + rowIndex - columnIndex, i]
  // 当前点 [rowIndex, columnIndex]
  // 中间点 [j, j + columnIndex - rowIndex]
  // 左下角顶点 [14, y] // 14 - rowIndex = y - columnIndex => y = 14 + columnIndex - rowIndex

  const result = [];

  // 右上角
  for (let i = 0; i < columnIndex; i++) {
    console.log(i + rowIndex - columnIndex, i);
    result.push(state.value[i + rowIndex - columnIndex][i]);
  }

  // 左下角
  for (let j = rowIndex; j <= 14; j++) {
    console.log(j, j + columnIndex - rowIndex);
    result.push(state.value[j][j + columnIndex - rowIndex]);
  }

  return result;
};

console.log(getLeftDiagonal(3, 7));

// 西北至东南方向, 左斜线
const leftDiagonal = computed<ChessEnum[]>(() => {
  const min = 1 + Math.min(ROWS.value, COLUMNS.value); // 15

  // eg: [0, 0], [1, 1], [2, 2] ... [14, 14]
  return (
    Array(min)
      .fill(0)
      // index from 0 to 14
      .map((_, index) => state.value[index][index])
  );
});

// 东北至西南方向, 右斜线
const rightDiagonal = computed<ChessEnum[]>(() => {
  const min = 1 + Math.min(ROWS.value, COLUMNS.value); // 15

  // eg: [0, 14], [1, 13], [2, 12] ... [14, 0]
  return (
    Array(min)
      .fill(0)
      // index from 0 to 14
      .map((_, index) => state.value[index][min - index - 1])
  );
});

// TODO 胜负判定
const checkWinner = (rowIndex: number, columnIndex: number, turn: boolean): ChessEnum => {
  // 仅须从当前落子点出发检查是否有 [孤立的四子相连] 或 [连续的五子相连] 即可
  // 水平方向, 左右
  // 垂直方向, 上下
  // 西北至东南方向, 左斜线
  // 东北至西南方向, 右斜线
  const targetWinner = turn ? ChessEnum.Black : ChessEnum.White;

  // let start = 0;
  // let end = COLUMNS.value;
  // rowIndex - FOUR > 0 && (start = rowIndex - FOUR);
  // columnIndex + FOUR < end && (end = columnIndex + FOUR);
  // const horizontal = state.value[rowIndex].slice(start, end + 1);
  // console.log(start, end);

  const horizontal = state.value[rowIndex];
  // 左侧
  if (rowIndex - FOUR >= 0) {
    return horizontal.slice(rowIndex - FOUR, rowIndex + 1).every(chess => chess === targetWinner)
      ? targetWinner
      : ChessEnum.None;
  } else if (rowIndex + FOUR <= COLUMNS.value) {
    // 右侧
    return horizontal.slice(rowIndex, rowIndex + FOUR + 1).every(chess => chess === targetWinner)
      ? targetWinner
      : ChessEnum.None;
  }

  const vertical = getColumnByIndex(columnIndex);
  // 上方
  if (columnIndex - FOUR >= 0) {
    return vertical.slice(columnIndex - FOUR, columnIndex + 1).every(chess => chess === targetWinner)
      ? targetWinner
      : ChessEnum.None;
  } else if (columnIndex + FOUR <= COLUMNS.value) {
    // 下方
    return vertical.slice(columnIndex, columnIndex + FOUR + 1).every(chess => chess === targetWinner)
      ? targetWinner
      : ChessEnum.None;
  }
};
</script>

<template>
  <!--  TODO 避免重渲染 -->
  <!-- canvas 版水印 -->
  <el-watermark
    :key="useChess.withWatermark"
    :content="useChess.withWatermark ? ['Gobang'] : ''"
    :font="watermarkFontStyle"
  >
    <h1 class="text-center">五子棋 (Gobang / Renju)</h1>

    <div class="flex justify-center gap-2 mb-4">
      <el-button type="primary"><nuxt-link to="/forbidden">禁手规则</nuxt-link></el-button>
      <el-button type="primary"><nuxt-link to="/canvas-version">Canvas Version</nuxt-link></el-button>
    </div>

    <div class="flex justify-center gap-2 mb-4">
      <el-button type="primary" @click="resetGame" :disabled="currentSteps === 0">Restart</el-button>
      <el-button type="primary" @click="undo" :disabled="currentSteps === 0">Undo</el-button>
      <el-button type="primary" @click="redo" :disabled="currentSteps === 0">Redo</el-button>
    </div>

    <div class="relative w-[1600px] h-[1600px] mx-auto">
      <chessboard-dom class="absolute!"></chessboard-dom>

      <div class="absolute top-[50px] right-[50px] c-white">FPS: {{ fps }}</div>

      <!-- 落棋识别区域 -->
      <template v-for="(row, rowIndex) in state" :key="rowIndex">
        <div
          v-for="(data, columnIndex) in row"
          :key="rowIndex + columnIndex"
          class="recognize-zone w-[100px] h-[100px] z-1 absolute cursor-pointer flex-center"
          :class="data === ChessEnum.None ? 'can-put-chess' : 'cursor-not-allowed'"
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
            class="absolute flex-center z-2 text-6"
            :class="data === ChessEnum.Black ? 'c-white' : 'c-black'"
          >
            {{ chessStep[rowIndex][columnIndex] }}
          </span>
          <!--          <img-->
          <!--            v-if="data === ChessEnum.Black"-->
          <!--            src="/assets/images/black-chess.svg"-->
          <!--            alt="black chess"-->
          <!--            class="black-chess w-[60px] h-[60px]"-->
          <!--          />-->
          <!--          <img-->
          <!--            v-else-if="data === ChessEnum.White"-->
          <!--            src="/assets/images/white-chess.svg"-->
          <!--            alt="white chess"-->
          <!--            class="white-chess w-[60px] h-[60px]"-->
          <!--          />-->
          <!--          <span-->
          <!--            v-if="data !== ChessEnum.None && useChess.withNumberInChess && chessStep[rowIndex][columnIndex]"-->
          <!--            class="absolute flex-center z-2 text-6"-->
          <!--            :class="data === ChessEnum.Black ? 'c-white' : 'c-black'"-->
          <!--          >-->
          <!--            {{ chessStep[rowIndex][columnIndex] }}-->
          <!--          </span>-->
        </div>
      </template>
    </div>
  </el-watermark>
</template>

<style scoped lang="scss">
.recognize-zone {
  &.can-put-chess {
    transition: border-width ease-in-out 0.3s;
    &:hover {
      //border: 1px solid theme('colors.primary.black');
      border: 1px solid #b5b5b5;
    }
  }
}
</style>
