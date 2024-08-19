<template>
  <div class="modal" @click="closeModal">
    <Card class="card" @click="(e) => e.stopPropagation()">
      <div class="closeBtn" @click="closeModal">
        <Icon name="material-symbols:close-small-outline-rounded" />
      </div>
    </Card>
  </div>
</template>

<script setup>
import Card from "../Card/Card.vue";
import Button from "../Button/Button.vue";

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
  if (props.visible) {
    toogleScroll();
  }
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

.closeBtn {
  position: absolute;
  top: -6px;
  right: -2px;
  font-size: 30px;
  color: rgb(106, 114, 117);
}

.closeBtn {
  position: absolute;
  top: -6px;
  right: -2px;
  font-size: 30px;
  color: rgb(106, 114, 117);
  cursor: pointer;
}

.closeBtn:active {
  color: rgb(255, 0, 0);
}

@media screen and (min-width: 749px) {
  .closeBtn:hover {
    color: rgb(255, 0, 0);
    transform: scale(1.06);
  }
  .closeBtn:active {
    transform: scale(0.96);
  }
}
</style>
