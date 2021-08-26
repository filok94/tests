<template>
  <nav>
    <img src="./assets/logo.png" alt="logo_of_the_site" width="60">
    <div>{{logo}}</div>
  </nav>
  <router-view></router-view>
</template>

<script setup>
  import { computed } from 'vue';
import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';

const route = useRoute()
  const store = useStore()
  const logo = computed(()=> route.params.userName)
</script>

<style lang='scss'>
$color:green;
  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color;
  margin-top: 60px;
}
nav {
  display: flex;
  justify-content: space-between;
}
</style>
