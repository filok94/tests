<template>
  <transition mode="out-in" @enter="enteringFrom">
    <div
      class="is-conclusion-loaded"
      v-if="userAnswers.length > 0 && person && questions.length > 0"
    >
      <div class="person-card" ref="card">
        <img :src="person.img" width="150" />
        <h2>
          <a :href="person.src">Вы {{ person.title }}</a>
        </h2>
        <p>{{ person.description }}</p>
        <p>
          Результат:
          <span>{{ userAnswers.filter((e) => e.isRight).length }}</span>
          из
          {{ questions.length }}
        </p>
      </div>
      <div class="result-qusetions-block">
        <div class="dots-list-constainer">
          <div
            class="dot"
            v-for="(q, i) of questions"
            :key="i"
            @click="activateDot(i)"
            :ref="
              (el: Element) => {
                if (el) allDotsRef[i] = el;
              }
            "
            ref="test"
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

<script lang="ts" setup>
import { useSjwStore } from "../stores/sjw";
import { computed, onMounted, ref } from "vue";
import Loading from "../components/Loading.vue";
import gsap from "gsap";
import {
  useAppearenceFromTop,
  useAppearenceFromBottom,
} from "../components/Animations";
import { usePointerSwipe } from "@vueuse/core";

//store vars
const emit = defineEmits(["is-button-shown"]);
const sjwStore = useSjwStore()
//refs
let allDotsRef = ref<Element[] | never>([]);
let card = ref<HTMLElement | null>(null);
let questionCard = ref(null);
let activatedDotIs = ref(0);

//swipers on block with questions and answers
const { distanceX } = usePointerSwipe(questionCard, {
  onSwipeStart(e) {
    e.preventDefault();
  },
  onSwipe() {
    gsap.to(questionCard.value, { x: -distanceX.value });
    if (distanceX.value < -20 || distanceX.value > 20) {
      gsap.to(questionCard.value, { opacity: 0.5 });
    } else {
      gsap.to(questionCard.value, { opacity: 1 });
    }
    if (distanceX.value > 20) {
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
  useAppearenceFromTop(card.value, 150);
  useAppearenceFromBottom(questionCard.value, 400);
};
onMounted(() => {

  sjwStore.getQusetions()


  sjwStore.getUserResults()



  sjwStore.getFinalPerson()
  emit("is-button-shown", true);
});
</script>

<style lang="scss" scoped>
//dynamic classes
.is-right {
  background: $right-gradient !important;
}
.is-active {
  transform: scale(180%) !important;
}
.is-header-right {
  background: $right-gradient;
  @include bcg-for-text();
}
.is-header-wrong {
  background: $bad-gradient;
  @include bcg-for-text();
}
//static classes
.is-conclusion-loaded {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  overflow: hidden;

  .person-card {
    @include card-bcg();
    padding: 1.5rem;
    text-align: left;
    display: grid;
    max-width: 90%;
    grid-template-rows: repeat (4, 1fr);
    grid-template-columns: minmax(10%, 80vw);
    height: 100%;
    img {
      border-radius: 15px;
      max-width: 90%;
    }
    h2 {
      margin: 1rem 0;
      a {
        text-decoration: none;
        &:any-link {
          color: $prim-text;
        }
        &:hover {
          text-decoration: underline;
          background: $gradient;
          @include bcg-for-text();
        }
      }
    }
    p {
      margin: 0.4rem 0;
      color: $grey-color;
      span {
        font-weight: bold;
        font-size: 1.4rem;
        color: $second-color;
      }
    }
  }
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
        background: $bad-gradient;
        border-radius: 100%;
        cursor: pointer;
        transition: 0.3s ease-in-out;
      }
    }

    .question-card {
      padding: 1rem;
      text-align: start;

      @include card-bcg();
      p {
        color: $grey-color;
        span {
          text-decoration: underline;
          font-weight: bold;
          font-size: 1.1rem;
        }
      }
    }
  }

  @media (min-width: $large-screen) {
    .person-card {
      width: 40%;
      margin-top: 3rem;
    }
    .result-qusetions-block {
      width: 40%;
    }
  }
}
</style>