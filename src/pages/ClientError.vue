<template>
  <h1>4<span>0</span>4</h1>
  <button @click.prevent="backToMainPage">На главную</button>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const backToMainPage = () => {
  router.push({
    name: "User",
    params: { userName: window.localStorage.getItem("isAuthedBy") },
  });
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 15rem;
  span {
    color: $second-color;
  }
}
button {
  outline: none;
  border: none;
  border-radius: 15px;
  background: $prim-color;
  font-size: 3rem;
  padding: 1rem;
  color: $prim-text;
  box-shadow: $card-shadow;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    background: $second-color;
    transform: scale(102%);
  }
}
</style>