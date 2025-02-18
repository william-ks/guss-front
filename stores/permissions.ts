import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const usePermissionStore = defineStore("permissionStore", () => {
  const config = useRuntimeConfig();



  const listAll = async () => {
    try {
      const data = await $fetch(
        `${config.public.apiUrl}/permission/list`,
        {
          credentials: "include",
        }
      );

      return data;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    listAll,
  };
});
