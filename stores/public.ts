import { defineStore } from "pinia";

export const usePublicStore = defineStore("publicStore", () => {
  const config = useRuntimeConfig();
  const api = config.public.apiUrl;

  const updateColor = async (data: IUpdateColor) => {
    if (!data.primaryColor && !data.secondaryColor && !data.theme) {
      throw new Error("Invalid data");
    }

    try {
      await $fetch(`${api}/public/update/color`, {
        credentials: "include",
        method: "PUT",
        body: data,
      });
    } catch (e: any) {
      throw new Error(e.response._data.message);
    }
  };

  return {
    updateColor,
  };
});

interface IUpdateColor {
  primaryColor: string;
  secondaryColor: string;
  theme: string;
}
