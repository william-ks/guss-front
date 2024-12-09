import { defineNuxtPlugin } from "#app";
import { useRouter } from "vue-router";

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const routes = router.getRoutes();

  nuxtApp.provide(
    "routes",
    routes.map((route) => ({
      name: route.name as string,
      path: route.path,
    })),
  );
});
