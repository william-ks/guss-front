<template>
  <div class="card">
    <slot />
  </div>
</template>

<script setup></script>

<style scoped>
.card {
  width: 100%;
  border-radius: 10px;
  border: 1px solid hsl(var(--card-border));
  padding: 16px 2%;
  background: hsl(var(--card));
  color: hsl(var(--card-foreground));
}
</style>
