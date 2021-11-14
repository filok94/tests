<template>
  <div class="games-collection" v-if="games">
    <div
      v-for="(game, i) in games"
      :key="i"
      class="game-banner"
      @click.stop="goToTest(i)"
    >
      <h2>{{ game.title }}</h2>
      <h3>{{ game.subtitle }}</h3>
      <p>Ваш результат: {{ results[i].filter((e) => e.isRight) }}</p>
      <img :src="game.img" alt />
    </div>
  </div>
  <Loading v-else />
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Loading from "../components/Loading.vue";

const router = useRouter();
const store = useStore();

const games = computed(() => store.state.global.games);
const results = computed(() => store.state.global.gamesResults);
const goToTest = (i) => {
  router.push({
    name: games.value[i].route,
    params: { step: games.value[i].firstStep },
  });
};
</script>

<style lang="scss" scoped>
.games-collection {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10vw, 430px));
  grid-gap: 1rem;
  .game-banner {
    @include card-bcg();
    box-shadow: $card-shadow;
    justify-items: center;
    padding: 0.5rem 1.5rem;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    text-align: start;
    h3,
    p {
      color: $grey-color;
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
</style>