<template>
  <div class="settings-page">
    <div class="settings-container">
      <div class="setting-type" id="avatar" @click="chooseAvatar">
        <img :src="defaultAvatarImage" alt width="40" class="setting-icon" />
        <p class="setting-text">Выбрать аватар</p>
      </div>
      <div class="setting-type" id="night-mode" @click="changeMode">
        <img
          src="../assets/dark-mode.svg"
          alt
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
    <img
      ref="imageSetting"
      class="image-holder"
      src="../assets/setting.svg"
      alt=""
    />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import gsap from "gsap";

const store = useStore();
const router = useRouter();
const mode = ref("ночной");
const darkMode = ref(true);
const chooseAvatar = () => {
  router.push({ name: "Avatar" });
};
const changeMode = () => {
  darkMode.value = !darkMode.value;
  if (mode.value == "дневной") {
    mode.value = "ночной";
  } else mode.value = "дневной";
};
const defaultAvatarImage = computed(
  () => store.state.global.avatarImageDefault
);
let imageSetting = ref(null);
let tl = gsap.timeline({ defaults: { duration: 3, ease: "none" } });
let settingsRotation;
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
      color: $grey-color;

      @include card-bcg();
      border-radius: 25px;

      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: scale(101%);
        .setting-text {
          color: $prim-color;
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