import {defineStore} from 'pinia';

export const useChessStore = defineStore('chess', {
  state: () => ({
    rowCells: 14,
    columnCells: 14,
    horizontalSize: 100,
    verticalSize: 100,
    /**
     * 是否禁手
     */
    hasForbidden: false,
    /**
     * 是否显示水印
     */
    withWatermark: true,
    /**
     * 棋子上是否显示该棋子相应步数
     */
    withNumberInChess: true
  }),
  getters: {},
  actions: {}
});
