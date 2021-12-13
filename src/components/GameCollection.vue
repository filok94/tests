<template>
  <div class="game-collection-container">
    <div class="games-collection" v-if="games">
      <div
        v-for="(game, i) in games"
        :key="i"
        class="game-banner"
        @click.stop="goToTest(i)"
      >
        <h2>{{ game.title }}</h2>
        <h3>{{ game.subtitle }}</h3>
        <p>
          Ваш результат:
          <a @click.prevent.stop="goToConclusion(i)" class="result-of-test">{{
            finalPerson
          }}</a>
        </p>
        <img :src="game.img" alt />
      </div>
    </div>
    <Loading v-else />

    <div class="background-text-container" ref="textBcg" v-show="games">
      <h1 id="background-text">GAME</h1>
      <h1 id="broken-letter">S</h1>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Loading from "../components/Loading.vue";
import gsap from "gsap";

const router = useRouter();
const store = useStore();

const games = computed(() => store.state.global.games);
const finalPerson = computed((e) => {
  return store.state.sjw.person
    ? store.state.sjw.person.title
    : "Еще не пройдено";
});
const goToTest = (i) => {
  router.push({
    name: games.value[i].route,
    params: { step: games.value[i].firstStep },
  });
};
const goToConclusion = (i) => {
  router.push({
    name: "Conclusion",
  });
};
let textBcg = ref(null);
let isRenderedForAnimation = computed(() => store.state.global.games);

onMounted(() => {
  let flickerTimeLime = gsap.timeline({
    repeat: 0,
    defaults: { duration: 3, ease: "elastic" },
  });
  flickerTimeLime
    .set("#broken-letter", { color: "#005ef1" })
    .set(textBcg.value, { textShadow: "0 0 280px #005ef1" })
    .to(textBcg.value, { textShadow: "0 0 260px #005ef1" })
    .to(textBcg.value, { textShadow: "0 0 300px #6025c3" })
    .to(textBcg.value, { textShadow: "0 0 280px #6025c3" })
    .to(textBcg.value, { textShadow: "0 0 260px #005ef1" })
    .to("#broken-letter", {
      textShadow: "0 0 180px #005ef1",
      color: "#005ef1",
      duration: 0.2,
    })
    .to("#broken-letter", {
      textShadow: "0 0 0px #005ef1",
      color: "rgba(255, 255, 255, 0.5)",
      duration: 0.2,
    })
    .to("#broken-letter", {
      textShadow: "0 0 180px #005ef1",
      color: "#005ef1",
      duration: 0.8,
    })
    .to("#broken-letter", {
      textShadow: "0 0 180px #005ef1",
      color: "#005ef1",
      duration: 0.2,
    })
    .to("#broken-letter", {
      textShadow: "0 0 0px #005ef1",
      color: "rgba(255, 255, 255, 0.5)",
      duration: 0.8,
    });
});
gsap.delayedCall(5, () => {
  gsap.to("#broken-letter", {
    rotation: 35,
    y: 10,
    ease: "bounce",
    duration: 1,
  });
});
</script>

<style lang="scss" scoped>
.game-collection-container {
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: 1fr;
  width: 100%;
  max-width: 90%;
  margin: 0;
  .games-collection {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10vw, 400px));
    grid-gap: 1rem;
    .game-banner {
      @include card-bcg();
      box-shadow: $card-shadow;
      justify-items: center;
      padding: 0.5rem 1.5rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      text-align: start;
      max-height: 12rem;
      h3,
      p {
        color: $grey-color;
        .result-of-test {
          font-size: 1.6rem;
          color: $prim-color;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      &:hover {
        transform: scale(102%);
        h2 {
          background: $gradient;
          @include bcg-for-text();
        }
      }
    }
  }
  .background-text-container {
    align-self: end;

    font-size: 2.5rem;
    transform: rotate(-35deg);
    display: flex;
    align-items: center;
    font-family: $neon-font;
    z-index: -1;
    #background-text {
      background: $gradient;
      @include bcg-for-text();
      color: $prim-color;
      margin: 0;
    }
    #broken-letter {
      margin: 0;
    }
  }
}
@media (min-width: $large-screen) {
  .game-collection-container {
    grid-template-columns: 5fr 1fr;
    .background-text-container {
      font-size: 3.5rem;
    }
  }
}
</style>
