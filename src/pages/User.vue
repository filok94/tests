<template >
  <div class="activated-window">
    <h1 ref="header">{{ tabs[activeTabIndex].name }}</h1>
    <transition @enter="enter" @leave="leave" mode="out-in">
      <component :is="activeTabIndex == 0 ? GameCollection : Settings"></component>
    </transition>
  </div>
  <navigation-circle :tabs="tabs" @activation="activeTarget"></navigation-circle>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, watch } from "vue";
import { useGlobal } from "../stores/global";
import gsap from "gsap";
import navigationCircle from "../components/navigationCircle.vue";
import Settings from "../components/Settings.vue";
import GameCollection from "../components/GameCollection.vue";
import { TabsUser } from '../types/testsTypes.interface'
const globalStore = useGlobal()
const activeTabIndex = ref(0);
const activeTarget = (target: number) => {
  activeTabIndex.value = target;
};
const tabs = reactive<Array<TabsUser>>([
  {
    name: "Games",
    target: ""
  },
  {
    name: "Settings",
    target: "",
  },
]);

const enter = (el: HTMLElement) => {
  gsap.set(el, { y: 0, opacity: 1 })
  gsap.from(el, { y: -100, duration: 0.3, opacity: 0 });
};
const leave = (el: HTMLElement) => {
  gsap.set(el, { y: 0, opacity: 1 })
  gsap.to(el, { y: 100, duration: 0.3, opacity: 0 });
};

const header = ref<null | HTMLHeadingElement>(null);
watch(activeTabIndex, () => {
  gsap.set(header.value, { x: 0, opacity: 1 })
  gsap.from(header.value, { x: -50, opacity: 0, duration: 0.3 });
});
onMounted(async () => {
  if (!globalStore.games) {
    await globalStore.getGames()
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
