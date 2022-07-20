<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, reactive, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ROUTER_NAMES } from "../router";
import { useGamesStore } from "../stores/games_store";

import VButton from "../components/common/vButton.vue";
import VCard from "../components/common/vCard.vue";
import vTranistionGrop from "../components/common/vTransitionGroup.vue";

import { IAnswersList } from "../types/testsTypes.interface";
import { IGetQuestionsResponse } from "../api/gameController/games.api.interfaces";
import {
  cardFadingWithText,
  cardGoLeft,
} from "../Helpers/Animations/AnimationsGame";

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
  router.push({
    name: ROUTER_NAMES.test.root,
    query: { step: nextStep },
  });
};
const activeAnswer = ref<HTMLElement | null>(null);
const chooseAnswer = (param: IAnswersList) => {
  if (Number(route.query.step) - 1 !== activeGame.value?.questions?.length) {
    let isFinal = param.index + 1 == activeGame.value?.questions?.length;
    cardGoLeft(activeAnswer.value, isFinal);

    isAnimate.value = true;
    setTimeout(() => {
      isAnimate.value = false;
      if (activeGame.value?.questions)
        previousBlocks.push(
          activeGame.value?.questions[Number(route.query.step) - 1]
        );
      if (!isFinal) {
        nextQuestion();
      }
    }, 400);
    gamesStore.pushAnswerToList(param);
  }
};

const currentBlock = computed(() =>
  activeGame.value?.questions
    ? activeGame.value?.questions[Number(route.query.step) - 1]
    : null
);
const previousBlocks = reactive<IGetQuestionsResponse[]>([]);

let button = ref<null | HTMLButtonElement>(null);
const isButtonShown = ref(false);
watch(
  () => anserwsList.value.length,
  (newValue) =>
    newValue == activeGame.value?.questions?.length
      ? (isButtonShown.value = true)
      : null
);
const pushToCalculate = () => {
  console.log(123);
};

//animations
const isAnimate = ref(false);
const onQuestionLeave = (el: HTMLElement) => cardFadingWithText(el);
</script>

//TODO: сделать грид, чтобы новый вопрос открывался в другой части сетки на
следующем этаже. (/) Предыдущий "этаж" должен при этом сомкнуться в ячейку и
принять цвет правильного или неправильного ответа
<template>
  <h1>{{ activeGame?.title }}</h1>
  <div class="game-wrapper">
    <div ref="activeAnswer" class="active">
      <v-card class="active_question card-head">
        <h2>
          {{ currentBlock?.question }}
        </h2>
      </v-card>
      <transition :duration="300" @leave="onQuestionLeave">
        <v-card v-if="!isAnimate" class="active_answers">
          <ul>
            <li
              v-for="(answer, n) in currentBlock?.answers"
              :key="n"
              @click.prevent="
                chooseAnswer({
                  answer: n == 0 || n == 1 || n == 2 || n == 3 ? n : 0,
                  index: Number(route.query.step) - 1,
                })
              "
            >
              {{ answer }}
            </li>
          </ul>
        </v-card>
      </transition>
    </div>
    <div class="previous previous_scrollable">
      <div class="previous_container">
        <vTranistionGrop>
          <v-card
            v-for="block in previousBlocks"
            :key="block.index"
            class="previous_container_item card-head"
          >
            <h2>{{ block.question }}</h2>
          </v-card>
        </vTranistionGrop>
      </div>
    </div>
  </div>

  <v-button
    v-if="isButtonShown"
    id="next_question_button"
    ref="button"
    :purpose="'primary'"
    @click="pushToCalculate"
  ></v-button>
</template>

<style lang="scss" scoped>
//dynamic

//static
h1 {
  text-align: left;
  font-size: 4rem;
}
.game-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 2rem;
  align-items: start;

  .active {
    &_question {
      background-color: rgb(77, 71, 71);
      position: relative;
      z-index: 2;
      min-height: 6rem;
    }
    &_answers {
      border-radius: 0 0 $border-prime $border-prime;
      margin-top: -1.1rem;
      position: relative;
      z-index: 1;
    }
  }
  .previous {
    &_scrollable {
      max-height: 30rem;
      overflow-y: scroll;
      overflow-x: visible;

      scrollbar-width: none;
      padding: 1rem;
    }
    &_container {
      display: flex;
      flex-direction: column-reverse;
      flex-grow: 1;
      gap: 1rem;
      &_item {
        z-index: 3;
        &:nth-of-type(odd) {
          background: $darkest-violet;
        }
        &:nth-of-type(even) {
          background: $dark-violet;
        }
      }
    }
  }
}
.card-head {
  height: 7rem;
  font-size: 0.9rem;
}
</style>
