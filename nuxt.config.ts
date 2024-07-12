// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  // https://nuxt.com/modules/electron
  // https://github.com/caoxiemeihao/nuxt-electron
  modules: ['@pinia/nuxt', '@unocss/nuxt', '@vueuse/nuxt', '@element-plus/nuxt'],
  elementPlus: {
    // element plus options
  }
});
