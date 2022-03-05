/* eslint-disable vue/no-multiple-template-root */
<template >
  <div class="activated-window">
    <h1 ref="header">{{ tabs[activeTabIndex].name }}</h1>
    <transition :css="false" @enter="enter" @leave="leave" mode="out-in">
      <component :is="activeTabIndex == 0 ? GameCollection : Settings"></component>
    </transition>
  </div>
  <navigation-circle :tabs="tabs" @activation="activeTarget"></navigation-circle>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { useStore } from "vuex";
import gsap from "gsap";
import navigationCircle from "../components/navigationCircle.vue";
import Settings from "../components/Settings.vue";
import GameCollection from "../components/GameCollection.vue";
const store = useStore();

const activeTabIndex = ref(0);
const activeTarget = (target) => {
  activeTabIndex.value = target;
};
const tabs = reactive([
  {
    name: "Games",
    target: "",
  },
  {
    name: "Settings",
    target: "",
  },
]);

const enter = (el, done) => {
  gsap.set(el, { y: 0, opacity: 1 })
  gsap.from(el, { y: -100, duration: 0.3, opacity: 0, onComplete: done });
};
const leave = (el, done) => {
  gsap.set(el, { y: 0, opacity: 1 })
  gsap.to(el, { y: 100, duration: 0.3, opacity: 0, onComplete: done });
};

const header = ref(null);
watch(activeTabIndex, () => {
  gsap.from(header.value, { x: -50, opacity: 0, duration: 0.3 });
});
onMounted(async () => {
  if (!store.state.global.games) {
    await store.dispatch("getGames")
  }
});
</script>

<style lang='scss' scoped>
.activated-window {
  h1 {
    text-align: start;
  }
}
</style>
