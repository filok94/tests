<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref, computed, onMounted, reactive, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { IGetQuestionsResponse } from "../api/gameController/games.api.interfaces";
import VButton from "../components/vButton.vue";
import { ROUTER_NAMES } from "../router";
import { useGamesStore } from "../stores/games_store";

const router = useRouter();
const route = useRoute();

const isButtonShownMethod = (e: boolean) => (isButtonShown.value = e);
const isButtonPrimary = computed(() =>
  isButtonShown.value ? "primary" : "cancel"
);
const { activeGame } = storeToRefs(useGamesStore());
const gamesStore = useGamesStore();
//нажатие на кнопку передает в стор, какой блок вопросов сейчас рендерить, и пушит следующий роут в УРЛ
const isButtonShown = ref(true);
let button = ref<null | HTMLButtonElement>(null);
const buttonName = ref("Next");

onMounted(async () => {
  await gamesStore.getAllGames();
  await gamesStore.setActiveGame(String(route.params.gameTitle));
});
//key contolls
let keyContolls = (e: KeyboardEvent) => {
  if (e.code == "Enter" && isButtonShown.value) {
    nextQuestion();
  }
};
const questionsToShow = reactive<IGetQuestionsResponse[]>([]);
watch(activeGame, (newValue) => {
  if (newValue?.questions) questionsToShow.push(newValue.questions[0]);
});
const nextQuestion = () => {
  let nextStep = Number(route.query.step) + 1;
  router.push({
    name: ROUTER_NAMES.test.root,
    query: { step: nextStep },
  });
  if (gamesStore.activeGame?.questions) {
    questionsToShow.push(gamesStore.activeGame.questions[nextStep]);
  }
};
</script>

<template>
  <!-- <transition @enter="test($event)" @leave="testAway($event)" mode="out-in"> -->
  <router-view @is-button-shown="isButtonShownMethod"></router-view>
  <h1>{{ activeGame?.id }}</h1>
  <div v-for="(block, i) in questionsToShow" :key="i">
    <h2>{{ block.question }}</h2>
    <h4>{{ block.answers[0] }}</h4>
    <h4>{{ block.answers[1] }}</h4>
    <h4>{{ block.answers[2] }}</h4>
    <h4>{{ block.answers[3] }}</h4>
  </div>
  <v-button
    id="test"
    ref="button"
    :disable="!isButtonShown"
    :purpose="isButtonPrimary"
    @click.prevent="nextQuestion()"
    @entered="keyContolls($event)"
    >{{ buttonName }}</v-button
  >
  <!-- </transition> -->
</template>

<style lang="scss" scoped>
#test {
  position: fixed;
  top: 80vh;
  right: 0;
  left: 0;
  margin: 0 auto;
}
</style>
