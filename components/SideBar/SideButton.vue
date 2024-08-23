<template>
  <label :key="`checkbox${title}`" class="hamburguer">
    <input
      :checked="isChecked"
      type="checkbox"
      @click="click"
      :id="`checkbox${title}`"
    />
    <span class="line line--top"></span>
    <span class="line line--middle"></span>
    <span class="line line--bottom"></span>
  </label>
</template>

<script setup>
const { isChecked, title } = defineProps({
  isChecked: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["toggleSide"]);

const click = () => {
  emit("toggleSide");
};
</script>

<style scoped>
input[type="checkbox"] {
  display: none;
}

.hamburguer {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  /* z-index: 9999; */
}

.line {
  position: absolute;
  width: 21px;
  height: 2px;
  left: 0;
  top: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  transition:
    transform 0.25s,
    background-color 0.25s,
    opacity 0.35s;
}

.line--top {
  transform: translateY(-7px);
}

.line--bottom {
  transform: translateY(7px);
}

input[type="checkbox"]:checked ~ .line--top {
  transform: rotate(45deg);
}

input[type="checkbox"]:checked ~ .line--middle {
  transform: rotate(16deg);
  opacity: 0;
}

input[type="checkbox"]:checked ~ .line--bottom {
  transform: rotate(-45deg);
}

@media screen and (min-width: 750px) {
  input[type="checkbox"]:checked:hover ~ .line {
    background-color: red;
  }
  input[type="checkbox"]:hover ~ .line {
    background-color: cyan;
  }
}
</style>
