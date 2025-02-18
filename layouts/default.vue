<template>
  <div class="dark:bg-gray-950 bg-gray-100">
    <div class="flex">
      <SideBar :visible="sideBarView" @close="changeSideBar" />
      <div class="right w-[100%]">
        <Header :sideBarView="sideBarView" @changeSideBar="changeSideBar" />
        <main>
          <slot />
        </main>
        <footer>
          <UContainer>
            <div class="py-[15px]">
              <h2 class="text-center cursor-pointer">
                Desenvolvido Por Will Code Systems | 2024 ®
              </h2>
            </div>
          </UContainer>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
const sideBarView = ref(false);

const changeSideBar = () => {
  sideBarView.value = !sideBarView.value;
};
</script>

<style>
main {
  width: 100%;
  min-height: calc(100vh - 56px - 62px);
}

footer {
  @apply bg-white dark:bg-gray-900 shadow-[0_-5px_10px_hsl(var(--shadow))];
}
</style>
