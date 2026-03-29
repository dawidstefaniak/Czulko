export default defineNuxtConfig({
  compatibilityDate: '2025-03-29',
  modules: ['@nuxtjs/tailwindcss'],
  ssr: false,
  app: {
    head: {
      htmlAttrs: { lang: 'pl' },
      title: 'Czółko',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
      ],
    },
  },
})
