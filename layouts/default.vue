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

<style>
main{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

footer.footer {
  width: 100%;
  padding: 15px 0;
  background: hsl(var(--card));
  text-align: center;
}

.page {
  padding: 15px 0;
  width: 100vw;
  min-height: calc(100vh - 134px);
}
</style>
