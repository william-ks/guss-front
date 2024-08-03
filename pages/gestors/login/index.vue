<template>
  <main>
    <img class="wave" src="~/assets/svg/animatedWave.svg" alt="" />
    <div class="center">
      <div class="logoBox">
        <img src="~/assets/gussLogo.png" alt="logomarca" />
      </div>
      <div class="loginBox" :class="{ fully: email || password }">
        <h2 class="title">Welcome William!</h2>
        <form action="">
          <label for="email">
            <p class="inputDesc">Email:</p>
            <div class="content" :class="{ full: email }">
              <input v-model="email" type="email" id="email" />
            </div>
          </label>
          <label for="password">
            <p class="inputDesc">Password:</p>
            <div class="content" :class="{ full: password }">
              <input
                @keyup="t"
                type="password"
                v-model="password"
                id="password"
              />
            </div>
          </label>
        </form>
        <button class="button">Sign In</button>
        <div class="lostPass">
          <p class="lost">Esqueci minha senha</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {},
};
</script>

<style scoped>
main {
  position: relative;
  background-color: #0e0e0e;
  color: rgb(228, 241, 244);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

main .wave {
  position: absolute;
  top: -105px;
  left: 0;
  width: 100%;
  z-index: inherit;
}

.center {
  height: 100%;
  /* background: rgb(87, 105, 148); */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logoBox {
  /* background-color: rgb(255, 255, 255); */
}

.logoBox img {
  filter: drop-shadow(0 0 8px black) drop-shadow(0 0 10px #01feff);
}

.loginBox {
  width: clamp(150px, 100%, 600px);
  background-color: rgba(20, 20, 20, 0.75);
  padding: 16px 4%;
  border-radius: 10px;
  z-index: 9;
  opacity: 0.9;
  backdrop-filter: blur(4px);
  border: 1px solid #01ffff6d;

  transition: background-color 0.75s, opacity 0.5s, border-color 0.5s,
    backdrop-filter 0.5s;
}

.loginBox:hover,
.loginBox.fully {
  opacity: 1;
  backdrop-filter: blur(8px);
  background-color: rgba(20, 20, 20, 0.8);
  border-color: #01feff;
}

.loginBox .title {
  font-size: 3.5rem;
  font-weight: 300;
  text-align: center;
  margin-bottom: 30px;
}

.loginBox form {
  width: 100%;
  display: flex;
  flex-direction: column;

  gap: 10px;
}

.loginBox .inputDesc {
  font-weight: 200;
  margin-bottom: 1px;
}

.loginBox .content {
  width: 100%;
  position: relative;
}

.loginBox .content::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 10%;
  left: 0;
  height: 3px;
  border-radius: 8px;
  z-index: 9999;
  /* background: #0ee1e1; */
  background: #036767;

  transition: width 0.5s, background 0.5s;
}

.loginBox .content:hover::after,
.loginBox .content:focus::after,
.loginBox .content.full::after {
  width: 100%;
  background: #0ee1e1;
}

.loginBox input {
  background-color: transparent;
  position: relative;
  width: 100%;
  border: none;
  border-radius: 0;
  box-shadow: none;
  color: white;
  font-size: 1.3rem;
}

.loginBox input.full,
.loginBox input:hover,
.loginBox input:focus {
  width: 100%;
  /* box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05); */
}

.button {
  margin-top: 35px;
  font-size: 2.5rem;
  width: 100%;
  text-align: center;
  box-shadow: none;
  background-color: transparent;
  border: 1px solid #036767;
  transition: transform 0.15s;
}

.button:hover {
  border-color: #0ee1e1;
  text-shadow: 1px 1px 2px black;
  transform: scale(1.02);
  background-color: transparent;
}

.button:active {
  transition: transform 0s;
  transform: scale(1);
}

.lostPass {
  margin-top: 10px;
  text-align: center;
}

.lost {
  display: inline;
  font-size: 1.1rem;
  font-weight: 200;
  transition: color 0.25s;
}

.lost:hover {
  color: rgb(253, 24, 74);
  cursor: pointer;
}

@media screen and (max-width: 1150px) {
  .center {
    height: 100%;
    justify-content: center;
  }

  .logoBox {
    display: none;
  }
}
</style>