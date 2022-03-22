<template>
  <div
    class="wrapper-for-circle"
    ref="wrapperForCircle"
    style="position: fixed; touch-action: none"
    :style="style"
  >
    <div
      class="nav-circle"
      @click.prevent.stop="activateNavCircle"
      :class="{ 'nav-circle-is-active': isCirclesActive }"
      ref="navCircle"
    >
      <img :src="avatarImage" alt="navigation_circle" />
      <p>Navigate</p>
      <div
        v-show="isCirclesActive"
        :ref="
          (el: Element | any) => {
            if (el) circles[i] = el;
          }
        "
        @click.self.stop.prevent="button($event)"
        :class="{ 'active-target': activeTabIs == i }"
        v-for="(tab, i) of props.tabs"
        :key="i"
        class="target-circle"
      >{{ tab.name }}</div>
      <div
        class="main-target-circle"
        @click.self.stop.prevent="logoutTab.action"
        v-show="isCirclesActive"
        ref="logoutTabRef"
      >{{ logoutTab.name }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, Ref, computed } from "vue";
import gsap from "gsap";
import { onClickOutside } from "@vueuse/core";
import { useDraggable } from "@vueuse/core";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { TabsUser } from '../types/testsTypes.interface'
import { useGlobal } from "../stores/global";

let globalStore = useGlobal()
let props = defineProps<{
  tabs: Array<TabsUser>
}
>();
let router = useRouter()
//avatar in the circle
let avatarImage = computed(() => {
  return globalStore.avatarImage
    ? globalStore.avatarImage
    : globalStore.avatarImageDefault;
});

//default borders
let stringifiedBordersOfMainCircle = ref("76px 53px 45px 92px");
let stringifiedBordersOfActiveTarget = ref("63px 78% 92% 45%");
//change borders
let changingBorders = (stringToChange: Ref<string>) => {
  let arrayHelper = [];
  for (let i = 0; i < 4; i++) {
    arrayHelper.push((Math.random() * (199 - 145) + 145).toFixed());
  }
  stringToChange.value = arrayHelper.join("% ") + "%";
};

//activate circle navigation and eventlisteners
const isCirclesActive = ref(false);
const circles: Ref<any[]> = ref([]);
let navCircle = ref(null);
let logoutTabRef = ref(null)
let wrapperForCircle = ref(null);
const { x, y, style } = useDraggable(wrapperForCircle, {
  initialValue: { x: window.innerWidth / 1.5, y: window.innerHeight / 1.5 },
  preventDefault: true,
});

let activateNavCircle = () => {
  if (!isCirclesActive.value) {
    isCirclesActive.value = true;
    let tl = gsap
      .timeline({ defaults: { duration: 0.1, ease: "ease" } })
      .from(circles.value[0], { x: "5rem", opacity: 0 })
      .from(circles.value[1], { y: "10rem", opacity: 0 })
      .from(logoutTabRef.value, { y: '-5rem', opacity: 0 })
    if (circles.value.length > 2) {
      tl.fromTo(
        circles.value[2],
        { x: "-6rem", y: "-8rem", opacity: 0 },
        { y: "-12rem", x: "-3rem", opacity: 1 }
      );
    }
  } else {
    isCirclesActive.value = false;
  }
  changingBorders(stringifiedBordersOfMainCircle);
};

//controll opened tabs
let emit = defineEmits<{ (e: "activation", target: number): void }>()
const activeTabIs = ref(0);
let button = (event: Event) => {
  let indexOfElem = Array.from(
    document.querySelectorAll(".target-circle")
  ).indexOf(event.target as HTMLElement);
  emit("activation", indexOfElem);
  activeTabIs.value = indexOfElem;
  changingBorders(stringifiedBordersOfActiveTarget);
};
let keyControls = (e: KeyboardEvent) => {
  if (e.code == "ArrowLeft") {
    if (activeTabIs.value == 0) {
      activeTabIs.value = props.tabs.length - 1;
    } else {
      activeTabIs.value--;
    }
  } else if (e.code == "ArrowRight") {
    if (activeTabIs.value == props.tabs.length - 1) {
      activeTabIs.value = 0;
    } else {
      activeTabIs.value++;
    }
  }
  changingBorders(stringifiedBordersOfActiveTarget);
  emit("activation", activeTabIs.value);
};

//signOut method
const auth = getAuth();
let signOutFromNavCircle = () => {
  signOut(auth).then(() => {
    router.push({ name: "Home" })
  }).catch((error) => {
    console.log(error);
  });
}

//main-user-actions tabs
const logoutTab = { name: "Logout", action: () => signOutFromNavCircle() }

//deactivate circle navigation and watch the status
onClickOutside(navCircle, () => (isCirclesActive.value = false));

watch(
  () => isCirclesActive.value,
  (newValue) => {
    if (newValue) {
      document.addEventListener("keydown", keyControls);
    } else {
      document.removeEventListener("keydown", keyControls);
    }
  }
);
onMounted(() => {
  globalStore.getAvatarImageForCircle();
  setInterval(() => changingBorders(stringifiedBordersOfMainCircle), 20000);
});
</script>
<style lang="scss" scoped>
@mixin targetCircle($background) {
  font-size: 0.8rem;
  line-height: 4rem;
  position: relative;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  background: $background;
  color: $grey-color;
  cursor: pointer;
}
.nav-circle {
  position: relative;

  border-radius: v-bind("stringifiedBordersOfMainCircle");
  width: 3rem;
  height: 3rem;
  padding: 1rem;
  background: $prim-color;
  box-shadow: 0 10px 30px rgba(85, 39, 160, 0.486),
    0 26px 26px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  transition: 0.3s ease;
  img {
    max-width: 80%;
    max-height: 80%;
  }
  p {
    font-size: 0.5rem;
    margin: 0;
    color: $grey-color;
  }
  &-is-active {
    transform: scale(110%);
    background: $second-color;
  }

  .target-circle {
    @include targetCircle($second-color);
  }
  div:nth-of-type(1) {
    right: 6rem;
    top: -1rem;
    z-index: -1;
  }
  div:nth-of-type(2) {
    right: 6rem;
    top: -12rem;
    z-index: -2;
  }
}
.main-target-circle {
  @include targetCircle($bad-gradient);
  right: 0;
  top: -6rem;
  z-index: -1;
}
.active-target {
  background: $prim-color !important;
  transform: scale(130%);
  transition: 0.3s ease-in-out;
  border-radius: v-bind("stringifiedBordersOfActiveTarget") !important;
}
</style>