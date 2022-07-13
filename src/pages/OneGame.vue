<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, reactive, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { IGetQuestionsResponse } from "../api/gameController/games.api.interfaces";
import VButton from "../components/vButton.vue";
import { ROUTER_NAMES } from "../router";
import { useGamesStore } from "../stores/games_store";
import VCard from "../components/vCard.vue";
import { MaybeElementRef } from "@vueuse/core";
import { IAnswersList } from "../types/testsTypes.interface";

import { cardFadingWithText } from "../Helpers/Animations/AnimationsGame";
import gsap from "gsap";

const router = useRouter();
const route = useRoute();

const { activeGame, anserwsList } = storeToRefs(useGamesStore());
const gamesStore = useGamesStore();

onMounted(async () => {
  await gamesStore.getAllGames();
  await gamesStore.setActiveGame(String(route.params.gameTitle));
});
//key contolls

const questionsToShow = reactive<IGetQuestionsResponse[]>([]);
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
const animationDuration = ref(300);
const nextQuestion = () => {
  let nextStep = Number(route.query.step) + 1;
  router.push({
    name: ROUTER_NAMES.test.root,
    query: { step: nextStep },
  });
  setTimeout(() => {
    if (gamesStore.activeGame?.questions) {
      questionsToShow.unshift(gamesStore.activeGame.questions[nextStep - 1]);
    }
  }, animationDuration.value);
};

const isAnimationing = ref(false);
const chooseAnswer = (param: IAnswersList) => {
  isAnimationing.value = true;
  if (
    param.index + 1 === Number(route.query.step) &&
    anserwsList.value.length != activeGame.value?.questions?.length
  ) {
    gamesStore.pushAnswerToList(param);
    if (Number(route.query.step) !== activeGame.value?.questions?.length) {
      nextQuestion();
    }
  }
};
const answers_list = ref<MaybeElementRef>(null);

const onAnswersLeave = (e: HTMLUListElement) => cardFadingWithText(e);
const onCardEnter = (e: Element | HTMLElement, done: () => void) => {
  gsap.to(e, {
    opacity: 1,
    onComplete: done,
  });
};
const onBeforeCardEnter = (el: Element) => {
  gsap.from(el, {
    opacity: 0,
    y: -50,
  });
};
</script>

//TODO: сделать грид, чтобы новый вопрос открывался в другой части сетки на
следующем этаже. (/) Предыдущий "этаж" должен при этом сомкнуться в ячейку и
принять цвет правильного или неправильного ответа
<template>
  <h1>{{ activeGame?.title }}</h1>
  <div class="game_grid">
    <TransitionGroup
      :css="false"
      @enter="onCardEnter"
      @before-enter="onBeforeCardEnter"
    >
      <div
        v-for="(block, i) in questionsToShow"
        :key="block.index"
        class="game_item"
        :class="{ is_moving: isAnimationing }"
      >
        <v-card class="game_item_question">
          <h2 :class="{ question_is_done: i != anserwsList.length }">
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
    </TransitionGroup>
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
.is_moving {
  transition: 0.3s all ease;
}
//static
.game_grid {
  display: grid;
  grid-template-columns: 1fr;
  margin: 0 auto;
  grid-gap: 2rem;
  justify-items: center;
}

.game_item {
  width: 80%;
  &_question {
    text-align: left;
    z-index: 2;
    position: relative;
  }
  &_answers {
    margin-top: -3rem;
    padding-top: 4rem;
    position: relative;
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
