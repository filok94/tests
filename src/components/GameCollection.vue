<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import { useGlobal } from "../stores/global";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import Loading from "./Loading.vue";
import { useFlickeringOnText } from "../Helpers/Animations";
import { ListedGame } from '../types/testsTypes.interface'
import vCard from "./vCard.vue";

const router = useRouter();
const { finalPersonsList, games } = storeToRefs(useGlobal())

const goToTest = (i: number) => {
  router.push({
    name: games.value![i].route,
    params: { step: games.value![i].firstStep },
  });
};
const goToConclusion = (game: ListedGame) => router.push({ name: game.routeToConclusion })

let gameCollectionContainer = ref(null)
let brokenLetter: Ref<null | Element> = ref(null)
onMounted(() => {
  useFlickeringOnText(brokenLetter.value)
})
</script>

<template>
  <div class="game-collection-container" ref="gameCollectionContainer">
    <div class="games-collection" v-if="finalPersonsList">
      <v-card
        :title="game.title"
        :description="game.subtitle"
        :hover="{ isHoverable: true, onElement: 'description' }"
        v-for="(game, i) in games"
        :key="i"
        @click.stop="goToTest(i)"
      >
        <p v-if="finalPersonsList">
          Ваш результат:
          <br />
          <button @click.prevent.stop="goToConclusion(game)" class="result-of-test">
            {{
              finalPersonsList[i]?.title ?
                finalPersonsList[i].title : "Еще не пройдено"
            }}
          </button>
        </p>
      </v-card>
    </div>
    <Loading v-else />

    <div class="background-text-container" v-show="games">
      <h1 id="background-text">GAME</h1>
      <h1 ref="brokenLetter" id="broken-letter">S</h1>
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
