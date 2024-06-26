// https://unocss.dev/guide/config-file
import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';

export default defineConfig({
  // ...UnoCSS options
  presets: [presetUno(), presetAttributify(), presetTypography(), presetWebFonts()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: [
    ['flex-center', 'flex items-center justify-center'],
    {
      'absolute-center': 'absolute top-0 bottom-0 left-0 right-0 m-auto'
    }
  ],
  theme: {
    colors: {
      primary: {
        orange: '#f1b152',
        black: '#000000', // 最外侧边框线颜色
        gray: '#fff5e9'
      },
      secondary: {
        black: '#000000' // TODO 棋牌内网格线颜色
      }
    }
  }
});
