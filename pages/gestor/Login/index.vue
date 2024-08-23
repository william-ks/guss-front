<template>
  <section class="page">
    <NuxtImg class="wave" src="/animatedWave.svg" />
    <div class="center">
      <div
        class="logo"
        @mouseover="showHighlightLogo(true)"
        @mouseleave="showHighlightLogo(false)"
      >
        <NuxtImg id="static" class="show" quality="10" src="/guss_static.svg" />
        <NuxtImg
          id="highlight"
          class="hide"
          quality="10"
          src="/guss_highlight.svg"
        />
      </div>
      <div
        class="box"
        :class="{ fully: fullLogin || boxHover }"
        @mouseover="showHighlightLogo(true)"
        @mouseleave="showHighlightLogo(false)"
      >
        <h2 class="text-center text-4xl font-light">
          Welcome {{ student ? student.firstName : "Student" }}!
        </h2>
        <form
          @keyup="verifyFullForm"
          @focus="boxHover = true"
          class="mb-7 mt-5 flex w-[100%] flex-col items-center justify-center gap-7"
        >
          <Input
            desc
            name="E-mail"
            placeholder="email@example.com"
            type="email"
            v-model="email"
            required
          />
          <Input
            desc
            name="Password"
            type="password"
            v-model="password"
            required
          />
        </form>
        <div class="mb-2 mt-9 flex w-[100%] items-center justify-center">
          <Button :disabled="!fullLogin" @click="login" class="w-[100%]"
            >Sign In</Button
          >
        </div>
        <div class="flex w-[100%] items-center justify-center">
          <NuxtLink to="">
            <button class="fPass">Esqueci minha senha</button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Input from "@/components/ui/Input/Input.vue";
import Button from "@/components/ui/Button/Button.vue";

const fullLogin = ref(false);

const staticLogo = ref(null);
const highlightLogo = ref(null);

const boxHover = ref(false);

const email = ref("");
const password = ref("");

definePageMeta({
  layout: "otherpage",
});

useHead({
  title: "Gestor/Login",
});

const student = null;

const login = () => {
  const a = document.querySelector("#static");
  if (a.classList.contains("hide")) {
    a.classList.remove("hide");
    a.classList.add("show");
  } else {
    a.classList.remove("show");
    a.classList.add("hide");
  }
};

const showHighlightLogo = (highlight) => {
  if (!fullLogin.value) {
    if (staticLogo.value == null) {
      staticLogo.value = document.querySelector("#static");
    }
    if (highlightLogo.value == null) {
      highlightLogo.value = document.querySelector("#highlight");
    }
    staticLogo.value.classList.add("hide");
    highlightLogo.value.classList.add("show");

    if (!highlight && !boxHover.value) {
      // show static Logo
      staticLogo.value.classList.remove("hide");
      staticLogo.value.classList.add("show");

      highlightLogo.value.classList.remove("show");
      highlightLogo.value.classList.add("hide");
    } else {
      // show highlight Logo
      staticLogo.value.classList.remove("show");
      staticLogo.value.classList.add("hide");

      highlightLogo.value.classList.remove("hide");
      highlightLogo.value.classList.add("show");
    }
    return;
  }
};

const verifyFullForm = () => {
  if (email.value || password.value) {
    showHighlightLogo(true);
  }

  if (email.value && password.value) {
    fullLogin.value = true;
    return;
  }

  if ((!email.value || !password.value) && boxHover.value === false) {
    fullLogin.value = false;
    showHighlightLogo(false);
  }
};
</script>

<style scoped>
.page {
  width: 100%;
  height: calc(100vh - 144px);

  position: relative;
}

.wave {
  position: absolute;
  z-index: 1;
  left: 0;
  min-width: 100vw;
  top: -350px;
}

.center {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 30%;
  display: none;
  position: relative;
}

.logo img#static {
  opacity: 1;
}
.logo img#highlight {
  filter: drop-shadow(0 0 5px hsl(var(--secondary)));
  opacity: 0;
}

.logo img {
  z-index: 3;
  width: 100%;
  position: absolute;
}

.box {
  width: clamp(150px, 95%, 600px);
  background-color: rgba(20, 20, 20, 0.75);
  padding: 16px 4%;
  border-radius: 10px;
  z-index: 3;
  opacity: 0.9;
  backdrop-filter: blur(4px);
  border: 1px solid hsl(var(--primary));

  transition:
    background-color 0.75s,
    opacity 0.5s,
    border-color 0.5s,
    backdrop-filter 0.5s,
    box-shadow 0.5s;
}

.box:hover,
.box.fully {
  opacity: 1;
  backdrop-filter: blur(8px);
  box-shadow:
    0 0 5px hsl(var(--secondary)),
    0 0 20px hsl(var(--secondary));
  background-color: rgba(20, 20, 20, 0.8);
  border-color: hsl(var(--secondary));
}

.fPass {
  font-size: 9px;
  font-weight: 200;
  color: rgb(174, 174, 174);
  letter-spacing: 1px;
  text-align: center;
  transition:
    box-shadow 0.25s,
    color 0.25s;
}

@media screen and (min-width: 750px) {
  .page {
    height: calc(100vh - 54px);
  }

  .box {
    width: clamp(150px, 50%, 600px);
  }

  .center {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  .logo {
    display: block;
  }

  .logo {
    visibility: visible;
    min-width: 300px;
    min-height: 300px;
  }

  .fPass:hover {
    color: rgb(251, 79, 79);
    text-shadow:
      0 0 5px rgb(255, 0, 0),
      0 0 20px rgb(255, 0, 0);
  }
}

.show {
  animation: show 0.25s forwards;
}

.hide {
  animation: hide 0.25s forwards;
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
