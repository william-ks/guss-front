<template>
  <div class="modal" @click="closeModal">
    <Card border class="card" @click="(e) => e.stopPropagation()">
      <div class="closeBtn" @click="closeModal">
        <Icon name="material-symbols:close-small-outline-rounded" />
      </div>
      <slot />
    </Card>
  </div>
</template>

<script setup>
import Card from "../Card/Card.vue";

const emit = defineEmits(["close"]);

const toogleScroll = () => {
  const body = document.querySelector("body");
  body.classList.toggle("lockScroll");
};

const closeModal = () => {
  toogleScroll();
  emit("close");
};

const props = defineProps({
  visible: Boolean,
});

onMounted(() => {
  toogleScroll();
});
</script>

<style scoped>
.modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 4%;
  z-index: 999;
}

.modal .card {
  width: clamp(350px, 90%, 850px);
  position: relative;
}

.modal .card.cBorder .closeBtn {
  border-top: 2px solid hsl(var(--border));
  border-right: 2px solid hsl(var(--border));
}

.closeBtn {
  background: hsl(var(--card-bg));
  width: 30px;
  height: 30px;
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -12px;
  right: -12px;
  font-size: 30px;
  color: rgb(106, 114, 117);
  cursor: pointer;
}

.closeBtn:active {
  color: hsl(8 80% 56%);
}

@media screen and (min-width: 749px) {
  .closeBtn:hover > span {
    color: hsl(8 80% 56%);
  }
}
</style>
