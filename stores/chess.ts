import {defineStore} from 'pinia';

export const useChessStore = defineStore('chess', {
  state: () => ({
    rowCells: 14,
    columnCells: 14,
    horizontalSize: 100,
    verticalSize: 100
  }),
  getters: {},
  actions: {}
});
