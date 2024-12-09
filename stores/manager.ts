import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useManagerStore = defineStore("managerStore", () => {
  const name = useStorage("managerName", "", localStorage, {
    mergeDefaults: true,
  });

  const email = useStorage("managerEmail", "", localStorage, {
    mergeDefaults: true,
  });

  const role = useStorage("managerRole", "", localStorage, {
    mergeDefaults: true,
  });

  const token = useStorage("token", "", localStorage, { mergeDefaults: true });

  const login = async (props: ILogin) => {
    if (!props.email && !props.password) {
      throw new Error("Por favor Preencha todos os campos");
    }

    try {
      const data: any = await $fetch(
        "http://localhost:3001/master/manager/login",
        {
          method: "POST",
          body: {
            email: props.email,
            password: props.password,
          },
        }
      );

      token.value = data.token;
      name.value = data.user.name;
      email.value = data.user.email;
      role.value = data.user.role;

      return "/manager/dashboard";
    } catch (e: any) {
      throw new Error(e.response._data.message);
    }
  };

  const readSelf = async () => {
    try {
      const data = await $fetch(
        "http://localhost:3001/master/manager/read/self",
        {
          headers: {
            authorization: `Bearer ${token.value}`,
          },
        }
      );

      return data;
    } catch (e: any) {
      throw new Error(e.response._data.message);
    }
  };

  const logOut = async () => {
    token.value = "";
    name.value = "";
    email.value = "";
    role.value = "";
    navigateTo("/");
  };

  return { name, email, role, token, login, readSelf, logOut };
});

interface ILogin {
  email: string;
  password: string;
}
