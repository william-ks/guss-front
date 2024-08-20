<template>
  <div
    class="bg"
    :class="{ visible: isVisible, noVisible: !isVisible }"
    @click="$emit('close')"
  >
    <aside class="aside" @click="stopPropagation">
      <header class="asideHeader">
        <button>
          <SideButton
            key="sideBarButton"
            @toggleSide="$emit('close')"
            :isChecked="isVisible"
            title="sidebar"
          />
        </button>
      </header>
    </aside>
  </div>
</template>

<script setup>
import SideButton from "./SideButton.vue";

const { isVisible } = defineProps({
  isVisible: Boolean,
});

const stopPropagation = (e) => {
  e.stopPropagation();
};
</script>

<style scoped>
.bg {
  background: rgba(0, 0, 0, 0.65);
  width: 0px;
  overflow: hidden;
  min-height: 100vh;
  position: fixed;
  z-index: 99;
  backdrop-filter: blur(4px);

  transition: width .35s;
}

.bg.noVisible {
  width: 100;
}

.bg.visible {
  width: 100vw;
}

.aside {
  width: 0;
  height: 100vh;
  background: hsl(var(--background));
  transition: width 0.35s;
  overflow: hidden;
  position: relative;
  border-right: 2px solid hsl(var(--card-border));
}

.bg.visible .aside {
  width: clamp(200px, 80%, 400px);
}

header {
  width: 100%;
  padding: 15px 4%;
  background: hsl(var(--card));
}
</style>
