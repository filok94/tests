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
import navigationCircle from "../components/navigationCircle.vue";
import Settings from "../components/Settings.vue";
import GameCollection from "../components/GameCollection.vue";
import { TabsUser } from '../types/testsTypes.interface'
import { Appearances } from "../Helpers/Animations";

const globalStore = useGlobal()
const activeTabIndex = ref(0);
const activeTarget = (target: number) => activeTabIndex.value = target

class Tab {
  name: string
  target: string

  constructor(name: string, target: string) {
    this.name = name
    this.target = target
  }
}
const tabs = reactive<Array<TabsUser>>([
  new Tab("Games", ""), new Tab("Settings", "")
]);

const enter = (el: HTMLElement) => Appearances.fromTop(100, el)
const leave = (el: HTMLElement) => Appearances.fromBottom(100, el)

const header = ref<null | HTMLHeadingElement>(null);
watch(activeTabIndex, () => Appearances.fromTop(50, header.value));
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
