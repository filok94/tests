<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import { useGlobal } from "../stores/global";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import Loading from "./OneLoading.vue";
import { useFlickeringOnText } from "../Helpers/Animations";
import { ListedGame } from "../types/testsTypes.interface";
import vCard from "./vCard.vue";

const router = useRouter();
const { finalPersonsList, games } = storeToRefs(useGlobal());

const goToTest = (i: number) => {
  router.push({
    name: games.value![i].route,
    params: { step: games.value![i].firstStep },
  });
};
const goToConclusion = (game: ListedGame) =>
  router.push({ name: game.routeToConclusion });

let gameCollectionContainer = ref(null);
let brokenLetter: Ref<null | HTMLElement> = ref(null);
onMounted(() => {
  useFlickeringOnText(brokenLetter.value);
});
</script>

<template>
  <div ref="gameCollectionContainer" class="game-collection-container">
    <div v-if="finalPersonsList" class="games-collection">
      <v-card
        v-for="(game, i) in games"
        :key="i"
        :title="game.title"
        :description="game.subtitle"
        :hover="{ isHoverable: true, onElement: 'description' }"
        @click.stop="goToTest(i)"
      >
        <p v-if="finalPersonsList">
          Ваш результат:
          <br />
          <button
            class="result-of-test"
            @click.prevent.stop="goToConclusion(game)"
          >
            {{
              finalPersonsList[i]?.title
                ? finalPersonsList[i].title
                : "Еще не пройдено"
            }}
          </button>
        </p>
      </v-card>
    </div>
    <Loading v-else />

    <div v-show="games" class="background-text-container">
      <h1 id="background-text">GAME</h1>
      <h1 id="broken-letter" ref="brokenLetter">S</h1>
    </div>
  </div>
</template>

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
    color: $color-violet;
    margin: 0;
  }
  #broken-letter {
    margin: 0;
  }
}
p {
  color: $color-grey;
  text-align: start;
  .result-of-test {
    padding: 0.3rem 0;
    font-size: 1.3rem;
    background: transparent;
    border: none;
    color: $color-grey;
    text-align: start;
    &:hover {
      text-decoration: underline;
    }
  }
}
.is-test-ended-container {
  position: relative;
  width: 0;
  height: 0;
  left: 90%;
  top: 1rem;
}
.is-test-ended {
  position: absolute;
  color: $color-violet;
  background: $gradient-green;
  padding: 0.6rem;
  border-radius: 100%;
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
