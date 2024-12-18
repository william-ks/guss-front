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

  const email = useStorage("managerEmail", "", localStorage, {
    mergeDefaults: true,
  });

  const role = useStorage("managerRole", {}, localStorage, {
    mergeDefaults: true,
  });

  const permissions = useStorage("managerPermissions", [], localStorage, {
    mergeDefaults: true,
  });

  const token = useStorage("token", "", localStorage, { mergeDefaults: true });

  const login = async (props: ILogin) => {
    if (!props.email && !props.password) {
      throw new Error("Por favor Preencha todos os campos");
    }

    try {
      const data: any = await $fetch(
        `${config.public.apiUrl}/master/manager/login`,
        {
          method: "POST",
          body: {
            email: props.email,
            password: props.password,
          },
        }
      );

      token.value = data.token;
      id.value = data.user.id;
      name.value = data.user.name;
      email.value = data.user.email;
      role.value = data.user.role;
      photo.value = data.user.photo;
      permissions.value = data.user.permissions;

      return "/manager/dashboard";
    } catch (e: any) {
      throw new Error(e.response._data.message);
    }
  };

  const readSelf = async () => {
    try {
      const data: any = await $fetch(
        `${config.public.apiUrl}/master/manager/read/self`,
        {
          headers: {
            authorization: `Bearer ${token.value}`,
          },
        }
      );

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
      const found = await $fetch(
        `${config.public.apiUrl}/master/manager/read/all`,
        {
          headers: {
            authorization: `Bearer ${token.value}`,
          },
        }
      );

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
        `${config.public.apiUrl}/master/manager/read/other/${id}`,
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

  const updateSelf = async (form: IUpdateUser) => {
    try {
      await $fetch(`${config.public.apiUrl}/master/manager/update/self`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token.value}`,
        },
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
      await $fetch(
        `${config.public.apiUrl}/master/manager/update/other/${otherId}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${token.value}`,
          },
          body: {
            ...form,
          },
        }
      );
    } catch (e: any) {
      throw new Error(e.data.message);
    }
  };

  const toggleManager = async (form: IToggleUser) => {
    try {
      await $fetch(
        `${config.public.apiUrl}/master/manager/toggleStatus/${form.managerId}`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token.value}`,
          },
          body: {
            status: form.status,
          },
        }
      );
    } catch (e: any) {
      throw new Error(e.data.message);
    }
  };

  const logOut = async () => {
    id.value = "";
    token.value = "";
    photo.value = "";
    name.value = "";
    email.value = "";
    role.value = {};
    permissions.value = [];
    navigateTo("/");
  };

  return {
    id,
    name,
    email,
    photo,
    role,
    token,
    permissions,
    readAll,
    readOther,
    updateSelf,
    toggleManager,
    updateOther,
    login,
    readSelf,
    logOut,
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
