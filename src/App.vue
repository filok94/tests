<template>
  <nav>
    <div id="logo">
      <p>SocialJustice</p>
      <p>Tests</p>
    </div>
    <div class="nav-user">
      <img width="40" src="https://avatars.dicebear.com/api/micah/:seed.svg" alt />
      {{ logo }}
    </div>
  </nav>
  <main>
    <div :class="circleClass" v-for="circleClass in classesForCircles"></div>
    <router-view></router-view>
  </main>
</template>

<script setup>
import { computed, ref, watch, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const logo = computed(() => route.params.userName)
let classesForCircles = reactive(['circle-1', 'circle-2', 'circle-3'])
</script>

<style lang='scss'>
$color: green;
@import "./assets/vars.scss";

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
  background: linear-gradient(90deg, #cdd4dd 0%, #8692aa 95%);
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
.circle-1 {
  @include circle(
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
}
</style>
