<template>
  <main>
    <SideBar @close="toggleStatus" :isVisible="isVisibleSideBar" />
    <Header
      :title="pageTitle"
      :isOpened="isVisibleSideBar"
      :open="toggleStatus"
    />
    <slot />
    <footer class="footer">
      <div class="center">
        <h2>@ Todos os direitos reservados</h2>
      </div>
    </footer>
  </main>
</template>

<script setup>
const isVisibleSideBar = useState("isVisibleSideBar", () => false);
const pageTitle = useState("pageTitle", () => "");

const toggleStatus = () => {
  isVisibleSideBar.value = !isVisibleSideBar.value;
};
</script>

<style scoped>
footer.footer {
  width: 100%;
  padding: 15px 0;
  background: hsl(var(--card));
  text-align: center;
}
</style>
