<template>
  <main>
    <slot />
    <footer class="footer">
      <div class="center">
        <h2>@ Todos os direitos reservados</h2>
      </div>
    </footer>
  </main>
</template>

<script setup></script>

<style>
main {
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

</style>
