<template>
  <nav>
    <div id="logo">
      <p>
        SocialJustice
      </p>
      <p>Tests</p>
    </div>
    <div class='nav-user'>
    <img width="40" src="https://avatars.dicebear.com/api/micah/:seed.svg" alt="">
    {{logo}}</div>
  </nav>
  <main>
    <router-view></router-view>
  </main>
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
@import './assets/vars.scss';

body {
  background: $bcg;
  margin: 0;
}
  #app {
  font-family: $font;
  text-align: center;
  color: $prim-text;
  margin: 0;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  background: linear-gradient(90deg, #cdd4dd 0%,#8692aa 95%);
  border-radius: 5px;
  #logo {
    display: flex;
    flex-direction: column;
    margin: 1rem;
    p {
      margin: 0;
      align-self: flex-start;
      @include bcg-for-text();
      background-image: $gradient;
    }
  }
  .nav-user {
    @include bcg-for-text();
    background-image: $sjw-gradient;
  }
}
</style>
