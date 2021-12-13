<template>
  <nav>
    <div id="logo">
      <p id="circled-logo" @click.prevent="goHomeByLogo">S J</p>
      <p id="text-logo" @click.prevent="goHomeByLogo">Games</p>
    </div>
  </nav>
  <div class="blob blob_1">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#005EF1"
        d="M36.1,-41.1C49.5,-31.8,64.9,-23,69.9,-10.1C74.8,2.8,69.3,19.8,58.8,30.1C48.3,40.3,32.7,43.7,16.7,52.4C0.7,61,-15.8,74.9,-28.9,72.9C-42.1,71,-51.9,53.3,-62.2,35.7C-72.6,18.2,-83.6,0.7,-84,-17.9C-84.3,-36.5,-74.1,-56.2,-58.3,-65.1C-42.5,-73.9,-21.3,-71.8,-5,-65.9C11.4,-60,22.7,-50.3,36.1,-41.1Z"
        transform="translate(100 100)"
      />
    </svg>
  </div>
  <div class="blob blob_2">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#6025C3"
        d="M42.5,-52.5C56.2,-39,69.4,-26.8,74.8,-11C80.2,4.8,77.8,24.2,67.1,35.1C56.5,46,37.5,48.4,19.2,56.7C1,65,-16.5,79.2,-27.6,75.4C-38.8,71.6,-43.6,49.7,-52.7,31.6C-61.7,13.4,-75.1,-1.1,-74.4,-14.5C-73.7,-27.9,-58.9,-40.2,-44.2,-53.5C-29.4,-66.7,-14.7,-80.9,-0.2,-80.7C14.3,-80.5,28.7,-65.9,42.5,-52.5Z"
        transform="translate(100 100)"
      />
    </svg>
  </div>
  <main>
    <router-view></router-view>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();

const goHomeByLogo = () => {
  router.push({
    name: "User",
    params: { userName: window.localStorage.getItem("isAuthedBy") },
  });
};
</script>

<style lang='scss'>
body {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  background: $bcg;
  margin: 0;
  .blob {
    position: fixed;
    z-index: -1;
    opacity: 0.7;
    &_1 {
      top: 10vh;
      left: -20rem;
      width: 90vh;
    }
    &_2 {
      top: -60vh;
      left: 40rem;
      width: 110vh;
    }
  }
}
main {
  margin-bottom: 4rem;
}
#app {
  font-family: $font;
  text-align: center;
  color: $prim-text;
  max-width: 100vw;
  margin: 1rem;
}
nav {
  display: block;
  #logo {
    display: flex;
    margin: 0.3em auto;
    font-size: 1rem;
    font-weight: bold;
    #circled-logo {
      cursor: pointer;
      background: $gradient;
      border-radius: 100%;
      padding: 0.4rem 0.5rem;
      color: white;
      margin: 0;
      letter-spacing: -1px;
    }
    #text-logo {
      margin: 0;
      cursor: pointer;
      align-self: flex-start;
      @include bcg-for-text();
      background-image: $gradient;
      align-self: center;
    }
  }
}
</style>
