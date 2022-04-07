<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
const backToMainPage = () => {
  router.push({
    name: "User",
    params: { userName: window.localStorage.getItem("isAuthedBy") },
  });
};
</script>

<template>
  <h1>
    4
    <span>0</span>4
  </h1>
  <button @click.prevent="backToMainPage">На главную</button>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 15rem;
  span {
    color: $color-pink;
  }
}
button {
  @include primary-button();
}
</style>