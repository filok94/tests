<template>
  <nav>
    <div id="logo">
      <p id="circled-logo">
        S
        J
      </p>
      <p id="text-logo">Tests</p>
    </div>
  </nav>
  <main>
    <router-view></router-view>
  </main>
  <FooterNavigation
  v-if ="localStorageGet('isAuthed')"/>
</template>

<script setup>
import FooterNavigation from './components/FooterNavigation.vue'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const localStorageGet = (key) => JSON.parse(window.localStorage.getItem(key))

onMounted(() => {
  if (localStorageGet('isAuthed')) {
    router.push({ name: 'User', params: { userName: window.localStorage.getItem('isAuthedBy') } })
  } else {
    router.push('/login')
  }
})
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
    margin: 1rem 1rem 2rem 1rem;
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
/*.circle-1 {
  @include circle(
    0s,
    120s,
    10em,
    10em,
    $prim-color,
    10vh,
    42vw,
    33px,
    90px,
    53px,
    81px
  );
}
.circle-2 {
  @include circle(
    2s,
    53s,
    3em,
    3em,
    $second-color,
    50vh,
    30vw,
    33px,
    90px,
    53px,
    81px
  );
}
.circle-3 {
  @include circle(
    3s,
    89s,
    14em,
    14em,
    $prim-color,
    90vh,
    13vw,
    33px,
    90px,
    53px,
    81px
  );
}
.circle-4 {
  @include circle(
    5s,
    110s,
    18em,
    18em,
    $prim-color,
    70vh,
    22vw,
    33px,
    90px,
    53px,
    81px
  );
}
.circle-5 {
  @include circle(
    6s,
    360s,
    6em,
    13em,
    $prim-color,
    20vh,
    51vw,
    33px,
    90px,
    53px,
    81px
  );
}*/
footer {
  position: fixed;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  width: 100%;
  @include card-bcg;
  bottom: 0;
  border-radius: 5px 5px 0 0;
  .bottom-user {
    margin-right: 1rem;
    cursor: pointer;
  }
}
</style>
