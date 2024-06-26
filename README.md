# 五子棋 Gobang

本项目为五子棋 `Web` 版前端实现, 使用 [Nuxt3 Starter](https://github.com/nuxt/starter/tree/v3) 模板

[在线试玩](https://321paranoiawhy.github.io/gobang/)

## 技术栈

- `Vue 3`
- `Nuxt`
- `TypeScript`
- `UnoCSS`
- `Pinia`
- `VueUse`

## 起步

前置依赖:

- `pnpm 8.15.4` (`pnpm -v`)
- `node v20.11.1` (`node -v`)

```bash
# 安装依赖
pnpm i

# 开发, 浏览器内输入 http://localhost:3000/
pnpm dev

# 打包, 打包产物位于根目录 .output 文件夹内
pnpm build
```

## 参考资料

- [Figma 设计图](<https://www.figma.com/design/tA5XBiinQMVjaOWPndbPxB/Gobang---%E4%BA%94%E5%AD%90%E6%A3%8B-(Community)>)
- [gobang - aoey](https://github.com/aooy/gobang)
- [gobang 在线试玩 - aoey](https://aooy.github.io/gobang/)
- [gobang - sky172839465](https://github.com/sky172839465/Gobang)
- [gobang 在线试玩 - sky172839465](<(https://sky172839465.github.io/gobang/)>)
- [五子棋 AI](https://github.com/lihongxun945/gobang)
- [五子棋 AI 在线试玩](http://gobang2.light7.cn/)

## 游戏规则

- [行棋规则](https://587.renju.org.tw/rule/rulehome.htm)

- 经典棋盘大小为 `15 x 15`, 共 `225` 颗棋子, 黑子 `113` 枚, 白子 `112` 枚
- 默认黑方先手, 先手方获胜概率略高于后手方, 且先手方存在必胜开局
- 黑白双方交替落子
- 已落子处不可继续落子
- 落子无悔, 但仍可设定每局游戏双方最大可悔棋次数, 如三次
- 禁手 (在对局中会被判负的行棋手段) 规则:
  - 三三禁手
  - 四四禁手
  - 长连禁手
  - 黑方五连且存在禁手, 禁手失效, 判定黑方胜
  - [禁手 - 百度百科](https://baike.baidu.com/item/%E7%A6%81%E6%89%8B/214940)
- 获胜规则:
  - 棋盘未落满, 当横 / 竖 / `45°` 斜向出现五颗同色棋子, 则执该色棋子方获胜
  - 棋盘已落满, 后手方获胜, 因先手方获胜概率略高于后手方

## 落子位置 (交叉点) 坐标

- 从左至右分别为 `A~O` 列, 共 `15` 列
- 从下至下分别为 `1~15` 行, 共 `15` 行
- 落子位置使用 `<行><列>` 命名, 如位于棋盘正中央的天元即以 `H8` 称之, 其余四小星从上到下、从左至右依次为 `D12`、`L12`、`D4`、`L4`

## TODO

### 实现基础

`Web` 版提供以下两种实现:

- `canvas` 性能更高, 但需要自行编写相关样式和逻辑
- `dom` 性能较低, 但实现简单
- 基于 `canvas` 的游戏引擎

### `UI` 相关

- 暗黑模式, 切换动画
- 背景音乐
- 落子动画及音效
- 错误落子 (如在已落子处落子) 震动和 `toast` 提示
- 媒体查询自适应尺寸

### 简易教程

### 功能相关

- 左右互搏 (单人模式)
- 人机对战
- 在线对战 (后台服务 `ping` 成功后方可开始, 否则提示服务不可用)
- `AI` 教学
- `AI` 对战
- 计分规则、计分排行榜
- 对局自动保存记录, 支持导出和分享对局信息
- 支持嵌入至其他网站
