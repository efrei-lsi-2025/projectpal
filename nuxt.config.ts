// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "@/assets/style/global.scss",
    "@/assets/style/theme.css",
    "primevue/resources/primevue.css",
    "primeflex/primeflex.css",
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
    public: {
      auth: {
        enableGlobalAppMiddleware: true,
        defaultProvider: "github",
      },
      vercel: {
        commitSha: process.env.VERCEL_GIT_COMMIT_SHA,
        branch: process.env.VERCEL_GIT_COMMIT_REF,
        env: process.env.VERCEL_ENV,
      },
    },
  },

  devtools: {
    enabled: true
  }
});
