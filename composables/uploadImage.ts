import { useStorage } from "@vueuse/core";

const uploadImage = async (formdata: FormData) => {
  const config = useRuntimeConfig();

  const token = useStorage("token", "", localStorage, {
    mergeDefaults: true,
  });

  try {
    const data = await $fetch(`${config.public.apiUrl}/image/upload`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token.value}`,
      },
      body: formdata,
    });

    return data;
  } catch (e) {
    console.log(e);
  }
};

export { uploadImage };
