<template>
  <div class="has-rights-to-login" v-if="doesUserHasRightToLogin">
    <div class="home-navigation">
      <div
        @click="nameOfActiveWindow = Window.auth"
        :class="{ active: nameOfActiveWindow == Window.auth }"
      >Авторизация</div>
      <div
        @click="nameOfActiveWindow = Window.registration"
        :class="{ active: nameOfActiveWindow == Window.registration }"
      >Регистрация</div>
    </div>
    <Reg :activeWindow="nameOfActiveWindow"></Reg>
  </div>
  <div class="has-no-rights-to-login" v-else>
    <h1>Вы уже вошли в систему, пожалуйста, вернитесь на главную страницу</h1>
    <button @click.prevent="backToMainPage">Вернуться</button>
  </div>
</template>

<script lang="ts" setup>
import Reg from "../components/RegWindow.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useEventListener } from '@vueuse/core'

//watch on which window is active and change the animation
enum Window {
  auth = "auth",
  registration = 'registration'
}
let nameOfActiveWindow = ref<Window>(Window.auth);

// key_arrows directions
let arrowDirections = (e: KeyboardEvent) => {
  if (e.code == "ArrowLeft") {
    nameOfActiveWindow.value = Window.auth;
  } else if (e.code == "ArrowRight") {
    nameOfActiveWindow.value = Window.registration;
  }
};
const doesUserHasRightToLogin = computed(() => {
  return !JSON.parse(window.localStorage.getItem("isAuthed")!);
});

useEventListener(document, 'keydown', (ev) => arrowDirections(ev))
const router = useRouter();
const backToMainPage = () => {
  router.push({
    name: "User",
    params: { userName: window.localStorage.getItem("isAuthedBy") },
  });
};
</script>

<style lang="scss" scoped>
.has-rights-to-login {
  overflow: hidden;
}
.home-navigation {
  border-radius: $border-prime;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  display: inline-flex;
  justify-content: center;

  flex-wrap: wrap;
  font-size: 2rem;
  margin: 0 1rem;

  div {
    border-radius: $border-prime;
    max-width: 100%;
    padding: 1rem;
    width: 100%;
    cursor: default;
    @include card-bcg();
    cursor: pointer;
  }
  .active {
    background: $gradient;
  }
}
.has-no-rights-to-login {
  button {
    outline: none;
    border: none;
    border-radius: $border-minimal;
    background: $color-violet;
    font-size: 3rem;
    padding: 1rem;
    color: $color-white;
    box-shadow: $shadow-black;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover {
      background: $color-pink;
      transform: scale(102%);
    }
  }
}

@media (min-width: $medium-screen) {
  .home-navigation {
    flex-wrap: nowrap;
  }
}
</style>