import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useRoleStore = defineStore("roleStore", () => {
  const config = useRuntimeConfig();

  const token = useStorage("token", "", localStorage, {
    mergeDefaults: true,
  });

  const listAll = async () => {
    try {
      const data = await $fetch(`${config.public.apiUrl}/role/read/all`, {
        headers: {
          authorization: `Bearer ${token.value}`,
        },
        credentials: "include",
      });

      return data;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    listAll,
  };
});
