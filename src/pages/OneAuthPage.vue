<script lang="ts" setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useEventListener } from "@vueuse/core";
import { Animations } from "../Helpers/Animations/CommonAnimations";
import { loginPage } from "../locales/loginPage";
import { ROUTER_NAMES } from "../router";

const route = useRoute();

// key_arrows directions
let arrowDirections = (e: KeyboardEvent) => {
  if (!document.activeElement?.classList.contains("v_form_input")) {
    if (e.code == "ArrowLeft") {
      router.push({ name: ROUTER_NAMES.login.sign_in });
    } else if (e.code == "ArrowRight") {
      router.push({ name: ROUTER_NAMES.login.sign_up });
    }
  }
};

useEventListener(document, "keydown", (ev) => arrowDirections(ev));
const router = useRouter();
onMounted(() => {
  router.push({
    name: ROUTER_NAMES.login.sign_in,
  });
});
const panelEntering = (el: HTMLDivElement) => {
  if (route.name == ROUTER_NAMES.login.sign_in) {
    Animations.fromLeft(100, el);
  } else {
    Animations.fromRight(100, el);
  }
};
const panelAway = (el: HTMLDivElement) => {
  if (route.name == ROUTER_NAMES.login.sign_in) {
    Animations.toRight(100, el);
  } else {
    Animations.toLeft(100, el);
  }
};
</script>

<template>
  <div class="home-navigation">
    <div
      :class="{ active: route.name == ROUTER_NAMES.login.sign_in }"
      @click="router.push({ name: ROUTER_NAMES.login.sign_in })"
    >
      {{ loginPage.auth }}
    </div>
    <div
      :class="{ active: route.name == ROUTER_NAMES.login.sign_up }"
      @click="router.push({ name: ROUTER_NAMES.login.sign_up })"
    >
      {{ loginPage.reg }}
    </div>
  </div>
  <router-view v-slot="{ Component }">
    <transition
      mode="out-in"
      :duration="200"
      @enter="panelEntering"
      @leave="panelAway"
    >
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<style lang="scss" scoped>
//dynamic

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
    cursor: pointer;
    background: $color-black;
  }
  .active {
    background: $gradient;
  }
}

@media (min-width: $medium-screen) {
  .home-navigation {
    flex-wrap: nowrap;
  }
}
</style>
