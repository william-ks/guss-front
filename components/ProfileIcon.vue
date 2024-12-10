<script setup>
import { useManagerStore } from "@/stores/manager";
const managerStore = useManagerStore();

const items = [
  [
    {
      label: managerStore.email,
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "My Account",
      icon: "i-heroicons-cog-8-tooth",
      click: () => navigateTo("/manager/self"),
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => managerStore.logOut(),
    },
  ],
];
</script>

<template>
  <UDropdown
    :items="items"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-start', arrow: true }"
  >
    <UAvatar
      :src="managerStore.photo || 'https://i.pinimg.com/736x/cd/3b/f5/cd3bf5ec0480195ac95ee4b17da01b0a.jpg'"
    />

    <template #account="{ item }">
      <div class="text-left">
        <p>Signed in as</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>

      <UIcon
        :name="item.icon"
        class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
      />
    </template>
  </UDropdown>
</template>
