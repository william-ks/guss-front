// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: false,

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
    layoutTransition: { name: "fade", mode: "out-in" },
  },

  plugins: ["~/plugins/routes.ts"],

  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@vueform/nuxt",
  ],

  tailwindcss: {
    cssPath: ["~/styles/tailwind.css", { injectPosition: "first" }],
    configPath: "~/tailwind.config.ts",
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },

  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },
});
