<script setup lang="ts">
import '@unocss/reset/normalize.css';

// 客户端立即加载棋子图片
if (process.client) {
  const blackChessImgUrl = new URL('./assets/images/black-chess.svg', import.meta.url).href;
  const blackChess = new Image();
  blackChess.src = blackChessImgUrl;

  const whiteChessImgUrl = new URL('./assets/images/white-chess.svg', import.meta.url).href;
  const whiteChess = new Image();
  whiteChess.src = whiteChessImgUrl;
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <!--  <div>-->
  <!--    <NuxtRouteAnnouncer />-->
  <!--    <NuxtWelcome />-->
  <!--  </div>-->
</template>
