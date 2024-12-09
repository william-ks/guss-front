<template>
  <UPopover :popper="{ placement: 'bottom-end' }">
    <UButton variant="ghost">
      <UIcon class="text-2xl" name="heroicons:swatch-20-solid" />
    </UButton>

    <template #panel>
      <div class="p-4">
        <div class="grid grid-cols-5 gap-px">
          <UTooltip
            :text="color"
            class="capitalize"
            v-for="color of colors"
            :key="color"
          >
            <div
              @click="setPrimaryColor(color)"
              :class="`p-[4px] w-[24px] h-[24px] rounded-md cursor-pointer hover-${color}`"
            >
              <span
                :class="`w-[16px] h-[16px] block rounded-full background-${color}`"
              ></span>
            </div>
          </UTooltip>
        </div>
      </div>
      <UDivider />
      <div class="p-4">
        <div class="grid grid-cols-5 gap-px">
          <UTooltip
            :text="grayColor"
            class="capitalize"
            v-for="grayColor of grayColors"
            :key="grayColor"
          >
            <div
              @click="setGrayColor(grayColor)"
              :class="`p-[4px] w-[24px] h-[24px] rounded-md cursor-pointer hover-${grayColor}`"
            >
              <span
                :class="`w-[16px] h-[16px] block rounded-full background-${grayColor}`"
              ></span>
            </div>
          </UTooltip>
        </div>
      </div>
    </template>
  </UPopover>
</template>

<script setup>
const appConfig = useAppConfig();

const colors = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];

const grayColors = ["slate", "cool", "zinc", "neutral", "stone"];

const setPrimaryColor = (color) => {
  appConfig.ui.primary = color;
  localStorage.setItem("nuxt-ui-primary", appConfig.ui.primary);
};

const setGrayColor = (color) => {
  appConfig.ui.gray = color;
  localStorage.setItem("nuxt-ui-gray", appConfig.ui.gray);
};

</script>

<style scoped>
.background-slate {
  @apply bg-slate-500;
}

.background-cool {
  @apply bg-cool-500;
}

.background-zinc {
  @apply bg-zinc-500;
}

.background-neutral {
  @apply bg-neutral-500;
}

.background-stone {
  @apply bg-stone-500;
}

.background-red {
  @apply bg-red-500;
}

.background-orange {
  @apply bg-orange-500;
}

.background-amber {
  @apply bg-amber-500;
}

.background-yellow {
  @apply bg-yellow-500;
}

.background-lime {
  @apply bg-lime-500;
}

.background-green {
  @apply bg-green-500;
}

.background-emerald {
  @apply bg-emerald-500;
}

.background-teal {
  @apply bg-teal-500;
}

.background-cyan {
  @apply bg-cyan-500;
}

.background-sky {
  @apply bg-sky-500;
}

.background-blue {
  @apply bg-blue-500;
}

.background-indigo {
  @apply bg-indigo-500;
}

.background-violet {
  @apply bg-violet-500;
}

.background-purple {
  @apply bg-purple-500;
}

.background-fuchsia {
  @apply bg-fuchsia-500;
}

.background-pink {
  @apply bg-pink-500;
}

.background-rose {
  @apply bg-rose-500;
}

.hover-slate {
  @apply dark:hover:bg-slate-800 hover:bg-slate-300;
}

.hover-cool {
  @apply dark:hover:bg-cool-800 hover:bg-cool-300;
}

.hover-zinc {
  @apply dark:hover:bg-zinc-800 hover:bg-zinc-300;
}

.hover-neutral {
  @apply dark:hover:bg-neutral-800 hover:bg-neutral-300;
}

.hover-stone {
  @apply dark:hover:bg-stone-800 hover:bg-stone-300;
}

.hover-red {
  @apply dark:hover:bg-red-900 hover:bg-red-300;
}

.hover-orange {
  @apply dark:hover:bg-orange-900 hover:bg-orange-300;
}

.hover-amber {
  @apply dark:hover:bg-amber-900 hover:bg-amber-300;
}

.hover-yellow {
  @apply dark:hover:bg-yellow-900 hover:bg-yellow-300;
}

.hover-lime {
  @apply dark:hover:bg-lime-900 hover:bg-lime-300;
}

.hover-green {
  @apply dark:hover:bg-green-900 hover:bg-green-300;
}

.hover-emerald {
  @apply dark:hover:bg-emerald-900 hover:bg-emerald-300;
}

.hover-teal {
  @apply dark:hover:bg-teal-900 hover:bg-teal-300;
}

.hover-cyan {
  @apply dark:hover:bg-cyan-900 hover:bg-cyan-300;
}

.hover-sky {
  @apply dark:hover:bg-sky-900 hover:bg-sky-300;
}

.hover-blue {
  @apply dark:hover:bg-blue-900 hover:bg-blue-300;
}

.hover-indigo {
  @apply dark:hover:bg-indigo-900 hover:bg-indigo-300;
}

.hover-violet {
  @apply dark:hover:bg-violet-900 hover:bg-violet-300;
}

.hover-purple {
  @apply dark:hover:bg-purple-900 hover:bg-purple-300;
}

.hover-fuchsia {
  @apply dark:hover:bg-fuchsia-900 hover:bg-fuchsia-300;
}

.hover-pink {
  @apply dark:hover:bg-pink-900 hover:bg-pink-300;
}

.hover-rose {
  @apply dark:hover:bg-rose-900 hover:bg-rose-300;
}
</style>
