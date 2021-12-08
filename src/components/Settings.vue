<template>
  <div class="settings-container">
    <div class="setting-type" id="avatar" @click="chooseAvatar">
      <img :src="defaultAvatarImage" alt width="40" />
      <p>Выбрать аватар</p>
    </div>
    <div class="setting-type" id="night-mode" @click="changeMode">
      <img
        src="../assets/dark-mode.svg"
        alt
        width="40"
        :class="{ 'is-dark': darkMode }"
      />
      <p>Переключить на {{ mode }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

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
</script>

<style lang="scss">
.settings-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .setting-type {
    display: flex;
    justify-content: start;
    gap: 1rem;
    align-items: center;
    margin: 0;

    background: $prim-color;
    border-radius: 94px 168px 155px 197px;
    width: 20rem;
    height: 20rem;

    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover {
      transform: scale(101%);
    }

    img {
      border-radius: 45%;
      transition: 0.3s ease-in-out;
    }
  }
  .is-dark {
    transform: rotate(180deg);
  }
}
</style>