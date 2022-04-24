<script lang="ts" setup>
import { ref, onMounted, watch, Ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useDraggable } from "@vueuse/core";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { TabsUser } from "../types/testsTypes.interface";
import { useGlobal } from "../stores/global";
import { Animations } from "../Helpers/Animations";
let globalStore = useGlobal();
let props = defineProps<{
  tabs: Array<TabsUser>;
}>();
let router = useRouter();
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
    arrayHelper.push((Math.random() * (199 - 100) + 100).toFixed());
  }
  stringToChange.value = arrayHelper.join("px ") + "px";
};

//activate circle navigation and eventlisteners
const isCirclesActive = ref(false);
const circles = ref<HTMLElement[] | never[]>([]);
let navCircle = ref<null | HTMLElement>(null);
let logoutTabRef = ref<HTMLElement | null>(null);
let wrapperForCircle = ref(null);
const { style } = useDraggable(wrapperForCircle, {
  initialValue: { x: window.innerWidth / 1.5, y: window.innerHeight / 1.5 },
  preventDefault: true,
});

let activateNavCircle = () => {
  if (
    !isCirclesActive.value &&
    navCircle.value?.offsetHeight &&
    navCircle.value?.offsetWidth
  ) {
    isCirclesActive.value = true;
    circles.value.forEach((e, index) => {
      if (e != null && navCircle.value) {
        index === 0
          ? Animations.fromTop(navCircle.value.offsetHeight, e)
          : null;
        index === 1
          ? Animations.fromTopRight(
              navCircle.value.offsetWidth,
              navCircle.value?.offsetHeight,
              e
            )
          : null;
        index === 2
          ? Animations.fromRight(navCircle.value.offsetWidth, circles.value[2])
          : null;
        index === 3
          ? Animations.fromBottomRight(
              navCircle.value?.offsetWidth,
              navCircle.value?.offsetHeight,
              e
            )
          : null;
        index === 4
          ? Animations.fromBottom(navCircle.value.offsetHeight, e)
          : null;
        index === 5
          ? Animations.fromBottomLeft(
              navCircle.value?.offsetWidth,
              navCircle.value?.offsetHeight,
              e
            )
          : null;
        index === 6
          ? Animations.fromLeft(navCircle.value.offsetWidth, e)
          : null;
      }
    });
    Animations.fromTopLeft(
      navCircle.value?.offsetWidth,
      navCircle.value?.offsetHeight,
      logoutTabRef.value
    );
  } else {
    isCirclesActive.value = false;
  }
  changingBorders(stringifiedBordersOfMainCircle);
};

//controll opened tabs
// eslint-disable-next-line no-unused-vars
let emit = defineEmits<{ (e: "activation", target: number): void }>();
const activeTabIs = ref(0);
let button = (event: Event) => {
  let indexOfElem = Array.from(
    document.querySelectorAll(".target-circle")
  ).indexOf(event.target as HTMLElement);
  emit("activation", indexOfElem);
  activeTabIs.value = indexOfElem;
  changingBorders(stringifiedBordersOfActiveTarget);
  for (let i of circles.value) {
    Animations.setScaleToDefault(i);
  }
  Animations.changeBorderAndScale(
    stringifiedBordersOfActiveTarget.value,
    1.3,
    circles.value[activeTabIs.value],
    "back"
  );
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
  signOut(auth)
    .then(() => {
      router.push({ name: "Home" });
    })
    .catch((error) => {
      console.log(error);
    });
};

//main-user-actions tabs
const logoutTab = { name: "Logout", action: () => signOutFromNavCircle() };

//deactivate circle navigation and watch the status
onClickOutside(wrapperForCircle, () => (isCirclesActive.value = false));

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

<template>
  <div
    ref="wrapperForCircle"
    class="wrapper-for-circle"
    style="position: fixed; touch-action: none"
    :style="style"
  >
    <div
      ref="navCircle"
      class="nav-circle"
      :class="{ 'nav-circle-is-active': isCirclesActive }"
      @click.prevent.stop="activateNavCircle"
    >
      <img :src="avatarImage" alt="navigation_circle" />
      <p>Navigate</p>
    </div>
    <div
      v-for="(tab, i) of props.tabs"
      v-show="isCirclesActive"
      :key="i"
      :ref="
      (el: Element | any) => {
        if (el) circles[i] = el;
      }
    "
      class="target-circle"
      :class="{ 'active-target': activeTabIs == i }"
      @click.self.stop.prevent="button($event)"
    >
      {{ tab.name }}
    </div>
    <div
      v-show="isCirclesActive"
      ref="logoutTabRef"
      class="logout-target-circle"
      @click.self.stop.prevent="logoutTab.action"
    >
      {{ logoutTab.name }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-for-circle {
  display: grid;
  grid-template-areas:
    "lt ct rt"
    "lc cc rc"
    "lb cb rb";
  position: relative;
  $areas: cb lb lc lt ct rt rc;

  @each $i in $areas {
    $c: index(
      $list: $areas,
      $value: $i,
    );
    $c: $c + 1;

    .target-circle:nth-of-type(#{$c}) {
      grid-area: $i;
      z-index: 0;
    }
  }

  grid-template-columns: 5rem;
  grid-gap: 1rem;
}

.nav-circle {
  border-radius: v-bind("stringifiedBordersOfMainCircle");
  width: 3rem;
  height: 3rem;
  padding: 1rem;
  background: $color-violet-1;
  box-shadow: 0 10px 30px rgba(85, 39, 160, 0.486),
    0 26px 26px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  transition: 0.3s ease;
  grid-area: cc;
  z-index: 1;

  img {
    max-width: 80%;
    max-height: 80%;
  }

  p {
    font-size: 0.5rem;
    margin: 0;
    color: $color-grey;
  }

  &-is-active {
    transform: scale(110%);
    background: $color-violet-3;
  }
}

.target-circle {
  @include targetCircle($color-violet);
}

.logout-target-circle {
  @include targetCircle($gradient-red);
  grid-area: rb;
}

.active-target {
  background: $color-violet-3 !important;
}
</style>
