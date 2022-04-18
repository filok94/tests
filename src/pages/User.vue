<script lang="ts" setup>
import { ref, onMounted, reactive, watch, computed } from "vue";
import { useGlobal } from "../stores/global";
import navigationCircle from "../components/navigationCircle.vue";
import Settings from "../components/Settings.vue";
import GameCollection from "../components/GameCollection.vue";
import Admin from "../components/Admin.vue";
import { Animations } from "../Helpers/Animations";
import { TabsUser } from "../types/testsTypes.interface";

const globalStore = useGlobal()
const activeTabIndex = ref(0);
const activeTarget = (target: number) => {
  activeTabIndex.value = target
}

class Tab<TabsUser> {
  constructor(public id: number, public name: string) {
    this.name = name
    this.id = id
  }
}
const components = [GameCollection, Settings, Admin]
const tabs = reactive<TabsUser[]>([
  new Tab(0, "Games"), new Tab(1, "Settings")
]);

const enter = (el: HTMLElement) => Animations.fromTop(100, el)
const leave = (el: HTMLElement) => Animations.fromBottom(100, el)

const header = ref<null | HTMLHeadingElement>(null);

const isUserAdmin = computed(() => globalStore.isAdmin);
watch(activeTabIndex, () => Animations.fromTop(50, header.value));
onMounted(async () => {
  if (!globalStore.games) {
    await globalStore.getGames()
  }
  await globalStore.getUserParams().then(e => {
    isUserAdmin ? tabs.push(new Tab(2, 'Admin')) : null
  })
});
</script>

<template >
  <div class="activated-window">
    <h1 ref="header">{{ tabs[activeTabIndex].name }}</h1>
    <transition @enter="enter" @leave="leave" mode="out-in">
      <component :is="components[activeTabIndex]"></component>
    </transition>
  </div>
  <navigation-circle :tabs="tabs" @activation="activeTarget"></navigation-circle>
</template>

<style lang='scss' scoped>
.activated-window {
  h1 {
    text-align: start;
  }
}
</style>
