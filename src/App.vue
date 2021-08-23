<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWindow msg="Hello Vue 3 + Vite" />
  <router-view></router-view>
</template>

<script setup>
import HelloWindow from './components/HelloWindow.vue'

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
</style>
