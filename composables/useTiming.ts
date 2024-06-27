/**
 * TODO 计时
 * 使用 requestAnimationFrame 和 performance.now()
 * 按天时分秒输出
 * 对象 {day: 0, hour: 0, minute: 0, second: 1}
 * formatted string, eg: 1d 1h 1m 1s
 */
export const useTiming = () => {
  if (!process.client) {
    return console.warn('[WARN] useTiming can not be used in server side, especially SSR.');
  }
};
