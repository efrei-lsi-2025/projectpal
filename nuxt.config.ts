// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "@/assets/style/global.scss",
    "@/assets/style/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
  ],
  modules: ["@sidebase/nuxt-auth"],
  build: {
    transpile: ["primevue"],
  },
  runtimeConfig: {
    secret: process.env.APP_SECRET,
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  auth: {
    enableGlobalAppMiddleware: true,
    defaultProvider: "github",
  },
});
