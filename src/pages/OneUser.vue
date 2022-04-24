<script lang="ts" setup>
import { ref, onMounted, reactive, watch, computed } from "vue";
import { useGlobal } from "../stores/global";
import navigationCircle from "../components/OnenavigationCircle.vue";
import OneSettings from "../components/OneSettings.vue";
import GameCollection from "../components/OneGameCollection.vue";
import oneAdmin from "../components/OneAdmin.vue";
import { Animations } from "../Helpers/Animations/CommonAnimations";
import { TabsUser } from "../types/testsTypes.interface";

const globalStore = useGlobal();
const activeTabIndex = ref(0);
const activeTarget = (target: number) => {
  activeTabIndex.value = target;
};

class Tab {
  constructor(public id: number, public name: string) {
    this.name = name;
    this.id = id;
  }
}
const components = [GameCollection, OneSettings, oneAdmin];
const tabs = reactive<TabsUser[]>([
  new Tab(0, "Games"),
  new Tab(1, "Settings"),
]);

const enter = (el: HTMLElement) => Animations.fromTop(100, el);
const leave = (el: HTMLElement) => Animations.fromBottom(100, el);

const header = ref<null | HTMLHeadingElement>(null);

const isUserAdmin = computed(() => globalStore.isAdmin);
watch(activeTabIndex, () => Animations.fromTop(50, header.value));
onMounted(async () => {
  if (!globalStore.games) {
    await globalStore.getGames();
  }
  await globalStore.getUserParams().then(() => {
    isUserAdmin.value ? tabs.push(new Tab(2, "Admin")) : null;
  });
});
</script>

<template>
  <div class="activated-window">
    <h1 ref="header">{{ tabs[activeTabIndex].name }}</h1>
    <transition mode="out-in" @enter="enter" @leave="leave">
      <component :is="components[activeTabIndex]"></component>
    </transition>
  </div>
  <navigation-circle
    :tabs="tabs"
    @activation="activeTarget"
  ></navigation-circle>
</template>

<style lang="scss" scoped>
.activated-window {
  h1 {
    text-align: start;
  }
}
</style>
