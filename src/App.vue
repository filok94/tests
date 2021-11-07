<template>
  <nav>
    <div id="logo" @click.prevent="goHomeByLogo">
      <p id="circled-logo">
        S
        J
      </p>
      <p id="text-logo">Games</p>
    </div>
  </nav>
  <main>
    <router-view></router-view>
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const localStorageGet = (key) => JSON.parse(window.localStorage.getItem(key))

onMounted(() => {

})
const goHomeByLogo = () => {
  router.push({ name: 'User', params: { userName: window.localStorage.getItem('isAuthedBy') } })
}
</script>

<style lang='scss'>
body {
  background: $bcg;
  margin: 0;
}
main {
  margin-bottom: 4rem;
}
#app {
  font-family: $font;
  text-align: center;
  color: $prim-text;
}
nav {
  display: block;
  #logo {
    display: flex;
    margin: 1rem 2rem 2rem 2rem;
    font-size: 1rem;
    font-weight: bold;
    #circled-logo {
      background: $gradient;
      border-radius: 100%;
      padding: 0.4rem 0.5rem;
      color: white;
      margin: 0;
      letter-spacing: -1px;
    }
    #text-logo {
      margin: 0;
      align-self: flex-start;
      @include bcg-for-text();
      background-image: $gradient;
      align-self: center;
    }
  }
}
</style>
