<script lang="ts" setup>
import { useSjwStore } from "../stores/sjw";
import { computed, onMounted, ref } from "vue";
import Loading from "../components/Loading.vue";
import gsap from "gsap";
import { Appearances } from "../Helpers/Animations";
import { usePointerSwipe } from "@vueuse/core";
import VCard from '../components/vCard.vue'

//store vars
const emit = defineEmits(["is-button-shown"]);
const sjwStore = useSjwStore()
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
    gsap.to(questionCard.value, { x: -distanceX.value });
    if (distanceX.value < -20 || distanceX.value > 20) {
      gsap.to(questionCard.value, { opacity: 0.5 });
    } else {
      gsap.to(questionCard.value, { opacity: 1 });
    }
  },
  onSwipeEnd(e, direction) {
    e.preventDefault();
    gsap.from(questionCard.value, { x: distanceX.value, opacity: 1 });
    gsap.to(questionCard.value, { x: 0, opacity: 1 });
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
  activatedDotIs.value = i;
  let tl = gsap.timeline({ defaults: { duration: 0.2, ease: "circle" } });
  tl.to(questionCard.value, { opacity: 0 });
  tl.from(questionCard.value, { x: -100, opacity: 0 });
  tl.set(questionCard.value, { y: 0, opacity: 1, zIndex: -3 });
};
let enteringFrom = () => {
  Appearances.fromTop(150, card.value?.card!)
  Appearances.fromBottom(100, questionCard.value)
};
onMounted(() => {
  sjwStore.getQusetions()
  sjwStore.getUserResults()
  sjwStore.getFinalPerson()
  emit("is-button-shown", true);
});
</script>

<template>
  <transition mode="out-in" @enter="enteringFrom">
    <div
      class="is-conclusion-loaded"
      v-if="userAnswers.length > 0 && person && questions.length > 0"
    >
      <v-card
        :title="person.title"
        :description="person.description"
        :image="person.img"
        ref="card"
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
            class="dot"
            v-for="(q, i) of questions"
            :key="i"
            @click="activateDot(i)"
            :ref="
              (el: any) => {
                if (el) allDotsRef[i] = el;
              }
            "
            :class="{
              'is-right': userAnswers[i].isRight,
              'is-active': i == activatedDotIs,
            }"
          ></div>
        </div>
        <div class="question-card" ref="questionCard">
          <h2
            :class="{
              'is-header-right': userAnswers[activatedDotIs].isRight,
              'is-header-wrong': !userAnswers[activatedDotIs].isRight,
            }"
          >{{ questions[activatedDotIs].question }}</h2>
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