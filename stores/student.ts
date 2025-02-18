import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useStudentStore = defineStore("studentStore", () => {
  const config = useRuntimeConfig();

  const student = useStorage("student", "", localStorage, {
    mergeDefaults: true,
  });

  const createStudent = async (props: ICreateStudent) => {
    try {
      await $fetch(`${config.public.apiUrl}/student/create`, {
        credentials: "include",
        method: "POST",
        body: props,
      });
    } catch (e: any) {
      throw new Error(
        e.response._data.message || "Error on create a new student."
      );
    }
  };

  const login = async (props: ILoginStudent) => {
    try {
      await $fetch(`${config.public.apiUrl}/student/login`, {
        credentials: "include",
        method: "POST",
        body: props,
      });

      return "/students";
    } catch (e: any) {
      throw new Error(e.response._data.message);
    }
  };

  const listAll = async () => {
    try {
      const data = await $fetch(`${config.public.apiUrl}/student/read/all`, {
        credentials: "include",
      });

      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const readOne = async (publicId: ILoginStudent) => {
    try {
      const data = await $fetch(
        `${config.public.apiUrl}/student/read/one/${publicId}`,
        {
          credentials: "include",
          method: "GET",
        }
      );

      return data;
    } catch (e: any) {
      throw new Error(e.response._data.message);
    }
  };

  const toggleStudent = async ({ id, status }: IToggleStudent) => {
    try {
      console.log("here");

      await $fetch(`${config.public.apiUrl}/student/toggle/status/${id}`, {
        credentials: "include",
        method: "PUT",
        body: { status },
      });
    } catch (e: any) {
      throw new Error(e.response._data.message);
    }
  };

  return {
    student,
    createStudent,
    login,
    listAll,
    readOne,
    toggleStudent,
  };
});

interface IToggleStudent {
  id: string;
  status: boolean;
}

interface ICreateStudent {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone?: string;
  birthday?: string;
  description?: string;
}

interface ILoginStudent {
  email: string;
  password: string;
}
