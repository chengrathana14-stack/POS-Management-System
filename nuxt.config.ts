// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core']
    }
  },
  css: [
    'bootstrap/dist/css/bootstrap.min.css'
  ],
  app: {
    head: {
      title: 'POS Management System',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Cashier-focused web POS for retail management' }
      ]
    }
  }
})
