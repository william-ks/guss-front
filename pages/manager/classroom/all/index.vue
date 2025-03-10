<template>
  <div class="center">
    <UButton @click="get">download</UButton>
  </div>
</template>

<script setup>
import { useRoleStore } from "@/stores/roles";
import { useManagerStore } from "@/stores/manager";
// import { useClassroomStore } from "@/stores/classroom";

const get = async () => {
  try {
    const response = await $fetch(
      `http://localhost:3001/api/schedule/read/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      }
    );

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
}
</style>
