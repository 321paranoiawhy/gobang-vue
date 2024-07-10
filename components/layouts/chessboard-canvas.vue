<script setup lang="ts">
// 可参考
// https://juejin.cn/post/7116329458335744037
// https://juejin.cn/post/6844903742735646733

type TDrawChessBoardOptions = {
  size: number;
  outerColor: string;
  innerColor: string;
  // borderColor: string;
};

const canvasRef = ref<HTMLCanvasElement>();
let context: CanvasRenderingContext2D;

const ROWS = ref(14); // 纵向 14 格
const COLUMNS = ref(14); // 横向 14 格
const SIZE = ref(100);

const LAYOUT_SIZE = computed(() => {
  return {
    width: (COLUMNS.value + 2) * SIZE.value,
    height: (ROWS.value + 2) * SIZE.value
  };
});

onMounted(() => {
  context = canvasRef.value?.getContext('2d')!;

  context.lineJoin = 'miter';
  context.fillStyle = 'white';
  context.fillRect(0, 0, LAYOUT_SIZE.value.width, LAYOUT_SIZE.value.height);

  // canvas 原点移动至中心点
  context.translate(LAYOUT_SIZE.value.width / 2, LAYOUT_SIZE.value.height / 2);

  // TODO 从 uno.config.ts 中获取色值
  drawChessBoard({size: SIZE.value, outerColor: 'black', innerColor: 'green'});
});

// 绘制棋盘
const drawChessBoard = (options: TDrawChessBoardOptions) => {
  const {size, outerColor, innerColor} = options;
  console.log(options);

  // 水平轴线
  for (let row = 0; row <= ROWS.value; row++) {
    if ([0, ROWS.value].includes(row)) {
      context.lineWidth = 2;
      context.strokeStyle = outerColor;
    } else {
      context.lineWidth = 1;
      context.strokeStyle = innerColor;
    }

    console.log(context.lineWidth);

    const x = size * (COLUMNS.value / 2);
    const y = (row - ROWS.value / 2) * size;
    context.moveTo(-x, y);
    context.lineTo(x, y);
    context.stroke();
  }

  // 竖直轴线
  for (let column = 0; column <= COLUMNS.value; column++) {
    if ([0, COLUMNS.value].includes(column)) {
      context.lineWidth = 2;
      context.strokeStyle = outerColor;
    } else {
      context.lineWidth = 1;
      context.strokeStyle = innerColor;
    }

    const x = (column - COLUMNS.value / 2) * size;
    const y = size * (ROWS.value / 2);
    context.moveTo(x, -y);
    context.lineTo(x, y);
    context.stroke();
  }
};

// 绘制棋子 (落子)
const drawChess = (x: number, y: number, isBlack: boolean, radius = 10) => {
  // 径向渐变
  // TODO 棋子外阴影
  const gradient = context.createRadialGradient(x, y, 10, x - 5, y - 5, 0);

  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.closePath();

  if (isBlack) {
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(1, '#636766');
  } else {
    gradient.addColorStop(0, '#d1d1d1');
    gradient.addColorStop(1, '#f9f9f9');
  }
  context.fillStyle = gradient;
  context.fill();
};

const onClickCanvas = (e: MouseEvent) => {
  const {offsetX, offsetY} = e;

  // 越界处理
  // 已有棋子则不可落子
  const x = Math.abs(Math.round(offsetX / LAYOUT_SIZE.value.width));
  const y = Math.abs(Math.round(offsetY / LAYOUT_SIZE.value.height));
};
</script>

<template>
  <canvas
    ref="canvasRef"
    :width="LAYOUT_SIZE.width"
    :height="LAYOUT_SIZE.height"
    class="block mx-auto"
    @click="onClickCanvas"
  ></canvas>
</template>

<style scoped lang="scss">
canvas {
  border: 1px solid theme('colors.primary.orange');
}
</style>
