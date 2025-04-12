import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useManagerStore = defineStore("managerStore", () => {
  const config = useRuntimeConfig();

  const id = useStorage("managerId", "", localStorage, {
    mergeDefaults: true,
  });

  const name = useStorage("managerName", "", localStorage, {
    mergeDefaults: true,
  });

  const photo = useStorage("managerPhoto", "", localStorage, {
    mergeDefaults: true,
  });

  const email = useStorage("student", "", localStorage, {
    mergeDefaults: true,
  });

  const role = useStorage("managerRole", {}, localStorage, {
    mergeDefaults: true,
  });

  const permissions = useStorage("managerPermissions", [], localStorage, {
    mergeDefaults: true,
  });

  const login = async (props: ILogin) => {
    if (!props.email && !props.password) {
      throw new Error("Por favor Preencha todos os campos");
    }

    try {
      const data: any = await $fetch(`${config.public.apiUrl}/manager/login`, {
        method: "POST",
        credentials: "include",
        body: {
          email: props.email,
          password: props.password,
        },
      });

      id.value = data.user.id;
      name.value = data.user.name;
      email.value = data.user.email;
      role.value = data.user.role;
      photo.value = data.user.photo;
      permissions.value = data.user.permissions;

      return "/manager/dashboard";
    } catch (e: any) {
      console.log(e);
      
      throw new Error(e.response._data.message);
    }
  };

  const readSelf = async () => {
    try {
      const data: any = await $fetch(
        `${config.public.apiUrl}/manager/read/self`,
        {
          credentials: "include",
        }
      );

      const colorMode = useColorMode();
      const appConfig = useAppConfig();

      if (data.theme) {
        colorMode.preference = data.theme;
      }

      if (data.primaryColor) {
        appConfig.ui.primary = data.primaryColor;
      }

      if (data.grayColor) {
        appConfig.ui.gray = data.grayColor;
      }

      name.value = data.name;
      email.value = data.email;
      photo.value = data.photo;
      role.value = data.role;
      permissions.value = data.permissions;

      return data;
    } catch (e: any) {
      throw new Error(e.response._data.message);
    }
  };

  const readAll = async () => {
    const toast = useToast();
    try {
      const found = await $fetch(`${config.public.apiUrl}/manager/read/all`, {
        credentials: "include",
      });

      return found;
    } catch (e) {
      toast.clear();
      toast.add({
        title: "Error",
        description: "Error on list managers.",
        color: "red",
      });
    }
  };

  const readOther = async (id: string) => {
    try {
      const data = await $fetch(
        `${config.public.apiUrl}/manager/read/other/${id}`,
        {
          credentials: "include",
        }
      );

      return data;
    } catch (e: any) {
      throw new Error(e.response._data.message);
    }
  };

  const updateSelf = async (form: IUpdateUser) => {
    try {
      await $fetch(`${config.public.apiUrl}/manager/update/self`, {
        method: "PUT",
        credentials: "include",
        body: {
          ...form,
        },
      });
    } catch (e: any) {
      throw new Error(e.data.message);
    }
  };

  const updateOther = async (form: IUpdateOther, otherId: string) => {
    try {
      await $fetch(`${config.public.apiUrl}/manager/update/other/${otherId}`, {
        method: "PUT",
        credentials: "include",
        body: {
          ...form,
        },
      });
    } catch (e: any) {
      throw new Error(e.data.message);
    }
  };

  const toggleManager = async (form: IToggleUser) => {
    try {
      await $fetch(
        `${config.public.apiUrl}/manager/toogle/status/${form.managerId}`,
        {
          method: "POST",
          credentials: "include",
          body: {
            status: form.status,
          },
        }
      );
    } catch (e: any) {
      throw new Error(e.data.message);
    }
  };

  const uploadPhoto = async (formdata: FormData) => {
    const link = await $fetch(`${config.public.apiUrl}/image/upload`, {
      method: "POST",
      credentials: "include",
      body: formdata,
    });

    return link;
  };

  const logOut = async () => {
    try {
      await $fetch(`${config.public.apiUrl}/public/signout`, {
        method: "GET",
        credentials: "include",
      });
      id.value = "";

      photo.value = "";
      name.value = "";
      email.value = "";
      role.value = {};
      permissions.value = [];
      navigateTo("/");
    } catch (e) {
      console.log("erro ao sair");
    }
  };

  const create = async (form: ICreateManager) => {
    try {
      await $fetch(`${config.public.apiUrl}/manager/create`, {
        method: "POST",
        credentials: "include",
        body: {
          ...form,
        },
      });
    } catch (e: any) {
      throw new Error(e.data.message);
    }
  }

  return {
    id,
    name,
    email,
    photo,
    role,
    permissions,
    readAll,
    readOther,
    updateSelf,
    toggleManager,
    updateOther,
    login,
    uploadPhoto,
    readSelf,
    logOut,
    create,
  };
});

interface ILogin {
  email: string;
  password: string;
}

interface IToggleUser {
  managerId: string;
  status: boolean;
}

interface IUpdateUser {
  name: string;
  email: string;
  photo: string;
  cpf: string;
  birthday: string;
}

interface IUpdateOther {
  roleId: number | null;
  permissions:
    | {
        id: number;
        toAdd: boolean;
        toRemove: boolean;
      }[]
    | null[];
}

interface ICreateManager{
  name: string;
  email: string;
  photo?: string;
  cpf: string;
  birthday?: string;
  password?: string;
  roleId: number;
}