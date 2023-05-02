// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@sidebase/nuxt-auth"],
  runtimeConfig: {
    secret: process.env.APP_SECRET,
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  auth: { globalAppMiddleware: true, provider: { type: "authjs" } },
});
