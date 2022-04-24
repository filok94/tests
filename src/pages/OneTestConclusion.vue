<script lang="ts" setup>
import { useSjwStore } from "../stores/sjw";
import { computed, onMounted, ref } from "vue";
import Loading from "../components/OneLoading.vue";

import { Animations } from "../Helpers/Animations/CommonAnimations";
import { cardScrolling } from "../Helpers/Animations/AnimationsSJW";
import { usePointerSwipe } from "@vueuse/core";
import VCard from "../components/vCard.vue";

//store vars
const emit = defineEmits(["is-button-shown"]);
const sjwStore = useSjwStore();
//refs
let allDotsRef = ref<Element[] | never>([]);
let card = ref<InstanceType<typeof VCard> | null>(null);
let questionCard = ref(null);
let activatedDotIs = ref(0);

//swipers on block with questions and answers
const { distanceX } = usePointerSwipe(questionCard, {
  onSwipeStart(e) {
    e.preventDefault();
  },
  onSwipe(e: PointerEvent) {
    e.preventDefault();
    Animations.toLeft(distanceX.value, questionCard.value, 1);
    if (distanceX.value < -20 || distanceX.value > 20) {
      Animations.toOpacity(0.5, questionCard.value);
    } else {
      Animations.toOpacity(1, questionCard.value);
    }
  },
  onSwipeEnd(e, direction) {
    e.preventDefault();
    Animations.fromToHorizontal(distanceX.value, 0, questionCard.value);

    if (direction == "RIGHT") {
      if (activatedDotIs.value == 0) {
        activatedDotIs.value = questions.value.length - 1;
      } else {
        activatedDotIs.value = activatedDotIs.value - 1;
      }
    } else if (direction == "LEFT") {
      if (activatedDotIs.value == questions.value.length - 1) {
        activatedDotIs.value = 0;
      } else {
        activatedDotIs.value = activatedDotIs.value + 1;
      }
    }
  },
});

//rendered helper computed
const questions = computed(() => sjwStore.questions);
const userAnswers = computed(() => sjwStore.userAnswers);
const person = computed(() => sjwStore.person);
let activateDot = (i: number) => {
  let previousDotIndex = activatedDotIs.value;
  let xDirection = i < previousDotIndex ? -100 : 100;
  activatedDotIs.value = i;
  cardScrolling(0, 0, xDirection, questionCard.value);
};
let enteringFrom = () => {
  if (card.value?.card) {
    Animations.fromTop(150, card.value.card);
  }
  Animations.fromBottom(100, questionCard.value);
};
onMounted(() => {
  sjwStore.getQusetions();
  sjwStore.getUserResults();
  sjwStore.getFinalPerson();
  emit("is-button-shown", true);
});
</script>

<template>
  <transition mode="out-in" @enter="enteringFrom">
    <div
      v-if="userAnswers.length > 0 && person && questions.length > 0"
      class="is-conclusion-loaded"
    >
      <v-card
        ref="card"
        :title="person.title"
        :description="person.description"
        :image="person.img"
      >
        <p class="card-result">
          Результат:
          <span>{{ userAnswers.filter((e) => e.isRight).length }}</span>
          из
          {{ questions.length }}
        </p>
      </v-card>
      <div class="result-qusetions-block">
        <div class="dots-list-constainer">
          <div
            v-for="(q, i) of questions"
            :key="i"
            :ref="
            (el: any) => {
              if (el) allDotsRef[i] = el;
            }
          "
            class="dot"
            :class="{
              'is-right': userAnswers[i].isRight,
              'is-active': i == activatedDotIs,
            }"
            @click="activateDot(i)"
          ></div>
        </div>
        <div ref="questionCard" class="question-card">
          <h2
            :class="{
              'is-header-right': userAnswers[activatedDotIs].isRight,
              'is-header-wrong': !userAnswers[activatedDotIs].isRight,
            }"
          >
            {{ questions[activatedDotIs].question }}
          </h2>
          <p class="right-answer">
            <span>Правильный ответ:</span>
            {{
              questions[activatedDotIs].answers[
                questions[activatedDotIs].rightAnswer
              ]
            }}
          </p>
          <p class="user-answer">
            <span>Ваш ответ:</span>
            {{
              questions[activatedDotIs].answers[
                userAnswers[activatedDotIs].answerIs
              ]
            }}
          </p>
        </div>
      </div>
    </div>
    <Loading v-else />
  </transition>
</template>

<style lang="scss" scoped>
//dynamic classes
.is-right {
  background: $gradient-green !important;
}

.is-active {
  transform: scale(180%) !important;
}

.is-header-right {
  background: $gradient-green;
  @include bcg-for-text();
}

.is-header-wrong {
  background: $gradient-red;
  @include bcg-for-text();
}

//static classes
.is-conclusion-loaded {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1.5rem;
  overflow: hidden;
  padding: 2rem 0;

  .result-qusetions-block {
    max-width: 100%;
    margin: 0.5rem 0;

    .dots-list-constainer {
      display: flex;
      justify-content: space-evenly;
      gap: 0.3rem;
      margin-bottom: 1.5rem;

      .dot {
        width: 1.2rem;
        height: 1.2rem;
        background: $gradient-red;
        border-radius: 100%;
        cursor: pointer;
        transition: 0.3s ease-in-out;
      }
    }

    .question-card {
      padding: 1rem;
      text-align: start;
      border-radius: $border-prime;
      background: $color-black-opacity;
      @include blur-bcg();

      p {
        color: $color-grey;

        span {
          text-decoration: underline;
          font-weight: bold;
          font-size: 1.1rem;
        }
      }
    }
  }

  .card-result {
    margin: 0.4rem 0;
    color: $color-grey;

    span {
      font-weight: bold;
      font-size: 1.4rem;
      color: $color-pink;
    }
  }

  @media (min-width: $large-screen) {
    .result-qusetions-block {
      width: 40%;
    }
  }
}
</style>
