<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, reactive, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ROUTER_NAMES } from "../router";
import { useGamesStore } from "../stores/games_store";
import { MaybeElementRef } from "@vueuse/core";

import VButton from "../components/common/vButton.vue";
import VCard from "../components/common/vCard.vue";
import vTranistionGrop from "../components/common/vTransitionGroup.vue";

import { IAnswersList } from "../types/testsTypes.interface";
import { IGetQuestionsResponse } from "../api/gameController/games.api.interfaces";
import { cardFadingWithText } from "../Helpers/Animations/AnimationsGame";

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  await gamesStore.getAllGames();
  await gamesStore.setActiveGame(String(route.params.gameTitle));
});
const { activeGame, anserwsList } = storeToRefs(useGamesStore());
const gamesStore = useGamesStore();

const nextQuestion = () => {
  let nextStep = Number(route.query.step) + 1;
  setTimeout(() => {
    if (gamesStore.activeGame?.questions) {
      questionsToShow.unshift(gamesStore.activeGame.questions[nextStep - 1]);
    }
  }, 150);
  router.push({
    name: ROUTER_NAMES.test.root,
    query: { step: nextStep },
  });
};
const chooseAnswer = (param: IAnswersList) => {
  gamesStore.pushAnswerToList(param);
  if (Number(route.query.step) !== activeGame.value?.questions?.length) {
    nextQuestion();
  }
};

const questionsToShow = reactive<IGetQuestionsResponse[]>([]);
const answers_list = ref<MaybeElementRef>(null);
watch(activeGame, (newValue) => {
  if (newValue?.questions) questionsToShow.push(newValue.questions[0]);
});

let button = ref<null | HTMLButtonElement>(null);
const isButtonShown = ref(false);
watch(anserwsList, (newValue) =>
  newValue.length == activeGame.value?.questions?.length
    ? (isButtonShown.value = true)
    : null
);
const pushToCalculate = () => {
  console.log(123);
};
let keyContolls = (e: KeyboardEvent) => {
  if (e.code == "Enter" && isButtonShown.value) {
    pushToCalculate();
  }
};

const animationDuration = ref(400);
const onAnswersLeave = (e: HTMLUListElement) => cardFadingWithText(e);
</script>

//TODO: сделать грид, чтобы новый вопрос открывался в другой части сетки на
следующем этаже. (/) Предыдущий "этаж" должен при этом сомкнуться в ячейку и
принять цвет правильного или неправильного ответа
<template>
  <h1>{{ activeGame?.title }}</h1>
  <div class="game_grid">
    <vTranistionGrop>
      <div
        v-for="block in questionsToShow"
        :key="block.index"
        class="game_item"
      >
        <v-card class="game_item_question">
          <h2 :class="{ question_is_done: block.index != anserwsList.length }">
            {{ block.question }}
          </h2>
        </v-card>
        <transition :duration="animationDuration" @leave="onAnswersLeave">
          <v-card
            v-if="block.index + 1 == Number(route.query.step)"
            ref="answers_list"
            class="game_item_answers"
          >
            <li
              @click.prevent="chooseAnswer({ index: block.index, answer: 0 })"
            >
              {{ block.answers[0] }}
            </li>
            <li
              @click.prevent="chooseAnswer({ index: block.index, answer: 1 })"
            >
              {{ block.answers[1] }}
            </li>
            <li
              @click.prevent="chooseAnswer({ index: block.index, answer: 2 })"
            >
              {{ block.answers[2] }}
            </li>
            <li
              @click.prevent="chooseAnswer({ index: block.index, answer: 3 })"
            >
              {{ block.answers[3] }}
            </li>
          </v-card>
        </transition>
      </div>
    </vTranistionGrop>
  </div>
  <v-button
    v-if="isButtonShown"
    id="next_question_button"
    ref="button"
    :purpose="'primary'"
    @entered="keyContolls($event)"
    @click="pushToCalculate"
  ></v-button>
</template>

<style lang="scss" scoped>
//dynamic
.question_is_done {
  background: $gradient;
  @include bcg-for-text;
}
//static
h1 {
  text-align: left;
  font-size: 6rem;
  background: $gradient;
  @include bcg-for-text;
}
.game_grid {
  display: grid;
  grid-template-columns: 1fr;
  margin: 0 auto;
  grid-gap: 2rem;
  justify-items: center;
  grid-auto-flow: row;
}

.game_item {
  width: 60%;
  margin-top: -3rem;
  &_question {
    text-align: left;
    z-index: 2;
    position: relative;
  }
  &_answers {
    margin-top: -3rem;
    padding-top: 4rem;
    border-radius: 0 0 $border-prime $border-prime;

    li {
      cursor: pointer;
      list-style: none;
      margin: 0.3rem;
      &:hover {
        background: $gradient;
        @include bcg-for-text;
      }
    }
  }
}

#next_question_button {
  position: fixed;
  top: 80vh;
  right: 0;
  left: 0;
  margin: 0 auto;
}
</style>
