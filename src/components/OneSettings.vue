<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useGlobal } from "../stores/global";
import { storeToRefs } from "pinia";
import gsap from "gsap";

let { avatarImageDefault } = storeToRefs(useGlobal());
const MODETYPES = {
  night: "Ночной",
  day: "Дневной",
} as const;
// eslint-disable-next-line no-redeclare
type MODETYPES = typeof MODETYPES[keyof typeof MODETYPES];

const router = useRouter();
const mode = ref<MODETYPES>(MODETYPES.night);
const darkMode = ref(true);
const chooseAvatar = () => {
  router.push({ name: "Avatar" });
};
const changeMode = () => {
  darkMode.value = !darkMode.value;
  if (mode.value == MODETYPES.day) {
    mode.value = MODETYPES.night;
  } else mode.value = MODETYPES.day;
};

let imageSetting = ref<null | HTMLImageElement>(null);
let tl = gsap.timeline({ defaults: { duration: 3, ease: "none" } });
let settingsRotation: ReturnType<typeof setInterval>;
onMounted(() => {
  tl.from(imageSetting.value, { x: 500, rotate: 180, ease: "ease" }).to(
    imageSetting.value,
    {
      rotate: "-=60",
      duration: 7,
    }
  );
  settingsRotation = setInterval(() => {
    gsap.to(imageSetting.value, { rotate: "-=60", ease: "none", duration: 10 });
  }, 10000);
});
onUnmounted(() => {
  clearInterval(settingsRotation);
});
</script>

<template>
  <div class="settings-page">
    <div class="settings-container">
      <div id="avatar" class="setting-type" @click="chooseAvatar">
        <img :src="avatarImageDefault" width="40" class="setting-icon" />
        <p class="setting-text">Выбрать аватар</p>
      </div>
      <div id="night-mode" class="setting-type" @click="changeMode">
        <img
          src="../assets/dark-mode.svg"
          width="40"
          :class="{ 'is-dark': darkMode }"
          class="setting-icon"
        />
        <p class="setting-text">
          Переключить на {{ mode }}
          <span>(В разработке)</span>
        </p>
      </div>
    </div>
    <img ref="imageSetting" class="image-holder" src="../assets/setting.svg" />
  </div>
</template>

<style lang="scss">
//dynamic class
.is-dark {
  transform: rotate(180deg);
}

// static class
.settings-page {
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 420px));
  justify-content: space-between;
  overflow: hidden;

  .settings-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10vw, 430px));
    grid-gap: 1rem;
    align-content: center;

    .setting-type {
      display: grid;
      grid-template-columns: 1fr 3fr;
      justify-items: start;
      align-items: center;

      margin: 0;
      padding: 1rem;
      height: 4rem;
      font-size: 1.2rem;
      color: $color-grey;

      @include blur-bcg();
      box-shadow: $shadow-black;
      background: $color-black-opacity;
      border-radius: $border-prime;

      cursor: pointer;
      transition: 0.3s ease-in-out;

      &:hover {
        transform: scale(101%);

        .setting-text {
          color: $color-violet;
        }
      }

      .setting-icon {
        transition: 0.3s ease-in-out;
      }

      .setting-text {
        text-align: left;
        margin: 0;

        span {
          font-size: 0.8rem;
        }
      }
    }
  }

  .image-holder {
    justify-self: center;
    width: 300px;
  }
}
</style>
