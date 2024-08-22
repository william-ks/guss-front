<template>
  <div>
    <section name="Colors" class="center">
      <h2
        class="my-5 border-b border-solid border-gray-800 pb-1 text-center text-4xl font-semibold"
      >
        Cores
      </h2>
      <ul class="ul">
        <li class="" v-for="color of colors" :key="color.name">
          <div
            class="h-[40px] w-[40px]"
            :style="{ backgroundColor: color.code }"
          ></div>
          <p class="text-sm">{{ color.name }}</p>
        </li>
      </ul>
    </section>
    <section name="Buttons" class="center">
      <h2
        class="my-5 border-b border-solid border-gray-800 pb-1 text-center text-4xl font-semibold"
      >
        Botões do site
      </h2>
      <div class="my-5 flex gap-4">
        <div class="flex flex-col gap-8">
          <Button>defafult</Button>
          <Button :disabled="true">default disabled</Button>
        </div>

        <div class="flex flex-col gap-8">
          <Button variant="outline">outline</Button>
          <Button variant="outline" :disabled="true"> outline disabled </Button>
        </div>
      </div>
    </section>

    <section name="Inputs" class="center">
      <h2
        class="my-5 mt-10 border-b border-solid border-gray-800 pb-1 text-center text-4xl font-semibold"
      >
        Inputs do site
      </h2>
      <div class="my-5 flex flex-wrap gap-4">
        <Input name="Nome" type="text" placeholder="Nome" />
        <Input name="E-mail" type="email" placeholder="E-mail" />
        <Input name="Senha" type="password" />
      </div>
    </section>

    <section name="Card" class="center">
      <h2
        class="my-5 mt-10 border-b border-solid border-gray-800 pb-1 text-center text-4xl font-semibold"
      >
        Cards
      </h2>
      <Card>
        <h3 class="">Este é um exemplo de card</h3>
        <Button @click="toggleModal" class="mt-5">Abrir modal</Button>
      </Card>
    </section>
    <Modal v-if="visible" @close="visible = false" :visible="visible.value" />

    <section class="m-10">
      <div class="center">
        <Nuxt-link to="/gestor/dashboard">
          <Button> Ir para gestor/dashboard </Button>
        </Nuxt-link>
      </div>
    </section>
    <section class="m-10">
      <div class="center">
        <Nuxt-link to="/gestor/Login">
          <Button> Ir para gestor/login </Button>
        </Nuxt-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import Button from "~/components/ui/Button/Button.vue";
import Input from "~/components/ui/Input/Input.vue";
import Card from "~/components/ui/Card/Card.vue";
import Modal from "~/components/ui/Modal/Modal.vue";
import { colors } from "~/composables/colors";
import { onMounted, ref } from "vue";

const visible = ref(false);

const toggleModal = () => {
  visible.value = true;
};
</script>

<style scoped>
.center {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2%;
}

.ul {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.ul li {
  width: 166px;

  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #ccc;
}

.ul li > div {
  width: 100%;
  height: 166px;
}

.ul li > p {
  padding: 10px 5%;
  text-align: center;
}
</style>
