<template>
  <div class="modal" @click.self="closeModal" v-if="visible">
    <Card class="card" v-bind="$attrs" :shadow="true" border="simple">
      <div class="closeBtn" @click="closeModal">
        <Icon name="material-symbols:close-small-outline-rounded" />
      </div>
      <slot />
    </Card>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import Card from "../Card/Card.vue";

// Props para receber o v-model
const props = defineProps({
  modelValue: Boolean, // Controla a visibilidade do modal
});

// Emit para sincronizar o v-model manualmente
const emit = defineEmits(["update:modelValue"]);

const visible = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    visible.value = newValue;
    if (newValue) {
      toggleScroll(true);
    } else {
      toggleScroll(false);
    }
  }
);

// Função para fechar o modal
const closeModal = () => {
  visible.value = false; // Atualiza o estado interno
  toggleScroll(false);
  // Sincroniza com o componente pai
  emit("update:modelValue", false);
};

// Alterna o scroll da página
const toggleScroll = (lock) => {
  const body = document.body;
  if (lock) {
    if (!body.classList.contains("lockscroll")) {
      body.classList.add("lockscroll");
    }
  } else {
    body.classList.remove("lockscroll");
  }
};

// Inicializa o estado ao montar o componente
onMounted(() => {
  if (visible.value) {
    toggleScroll(true);
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
  padding: 0 5%;
  z-index: 9;
}

.modal .card {
  width: clamp(350px, 90%, 850px);
  position: relative;

  @apply dark:bg-gray-900 bg-gray-50;
}

.modal .card .closeBtn {
  border-top: 1px solid;
  border-right: 1px solid;
  @apply dark:border-primary-500 border-primary-900 dark:bg-gray-900 bg-gray-100;
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
  transition: color 0.25s;
}

.closeBtn:active {
  color: hsl(8 80% 56%);
}

@media screen and (min-width: 749px) {
  .closeBtn:hover>span {
    color: hsl(8 80% 56%);
  }
}
</style>
