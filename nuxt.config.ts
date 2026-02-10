// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-10-08',
  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],


  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001/api'
    }
  },
});