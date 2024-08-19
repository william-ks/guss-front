// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: false,
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@nuxt/image"],

  tailwindcss: {
    cssPath: ["~/styles/tailwind.css", { injectPosition: "first" }],
  },
});