import {defineStore} from 'pinia';
import type {TRowNumberPosition, TColumnNumberPosition} from '~/types/chess';

type TChessState = {
  /**
   * 每行格子数
   */
  rowCells: number;
  /**
   * 每列格子数
   */
  columnCells: number;
  /**
   * 每个格子水平方向尺寸, 单位: px
   */
  horizontalSize: number;
  /**
   * 每个格子垂直方向尺寸, 单位: px
   */
  verticalSize: number;
  /**
   * 是否禁手
   */
  hasForbidden: boolean;
  /**
   * 是否显示水印
   */
  withWatermark: boolean;
  /**
   * 棋子上是否显示该棋子相应步数
   */
  withNumberInChess: boolean;
  /**
   * 行号显示位置, 默认显示在右侧
   */
  rowNumberPosition: TRowNumberPosition;
  /**
   * 列号显示位置, 默认显示在底部
   */
  columnNumberPosition: TColumnNumberPosition;
};

export const useChessStore = defineStore('chess', {
  state: (): TChessState => ({
    rowCells: 14,
    columnCells: 14,
    horizontalSize: 100,
    verticalSize: 100,
    hasForbidden: false,
    withWatermark: true,
    withNumberInChess: true,
    rowNumberPosition: 'right',
    columnNumberPosition: 'bottom'
  }),
  getters: {},
  actions: {}
});
