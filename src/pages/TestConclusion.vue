<template>
  <transition mode="out-in" @enter="enteringFrom">
    <div class="is-conclusion-loaded" v-if="renderData.person">
      <div class="person-card" ref="card">
        <img :src="renderData.person.img" alt width="150" />
        <h2>
          <a :href="renderData.person.src">Вы {{ renderData.person.title }}</a>
        </h2>
        <p>{{ renderData.person.description }}</p>
        <p>
          Результат:
          <span>{{
            renderData.userAnswers.filter((e) => e.isRight).length
          }}</span>
          из
          {{ renderData.questions.length }}
        </p>
      </div>
      <div class="result-qusetions-block">
        <div class="dots-list-constainer">
          <div
            class="dot"
            v-for="(q, i) of renderData.questions"
            :key="i"
            @click="activateDot(i)"
            :ref="
              (el) => {
                if (el) allDotsRef[i] = el;
              }
            "
            :class="{
              'is-right': renderData.userAnswers[i].isRight,
              'is-active': i == activatedDotIs,
            }"
          ></div>
        </div>
        <div class="question-card" ref="questionCard">
          <h2
            :class="{
              'is-header-right': renderData.userAnswers[activatedDotIs].isRight,
              'is-header-wrong':
                !renderData.userAnswers[activatedDotIs].isRight,
            }"
          >
            {{ renderData.questions[activatedDotIs].question }}
          </h2>
          <p class="right-answer">
            <span>Правильный ответ:</span>
            {{
              renderData.questions[activatedDotIs].answers[
                renderData.questions[activatedDotIs].rightAnswer
              ]
            }}
          </p>
          <p class="user-answer">
            <span>Ваш ответ:</span>
            {{
              renderData.questions[activatedDotIs].answers[
                renderData.userAnswers[activatedDotIs].answerIs
              ]
            }}
          </p>
        </div>
      </div>
    </div>
    <Loading v-else />
  </transition>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import Loading from "../components/Loading.vue";
import gsap from "gsap";
import { usePointerSwipe } from "@vueuse/core";

//store vars
const emit = defineEmits(["is-button-shown"]);
const storeVuex = useStore();
const store = storeVuex.state.sjw;

//refs
let allDotsRef = ref([]);
let card = ref(null);
let questionCard = ref(null);
let activatedDotIs = ref(0);

//swipers on block with questions and answers
const { distanceX, isSwiping } = usePointerSwipe(questionCard, {
  onSwipeStart(e) {
    e.preventDefault();
  },
  onSwipe(e) {
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
        activatedDotIs.value = renderData.value.questions.length - 1;
      } else {
        activatedDotIs.value = activatedDotIs.value - 1;
      }
    } else if (direction == "LEFT") {
      if (activatedDotIs.value == renderData.value.questions.length - 1) {
        activatedDotIs.value = 0;
      } else {
        activatedDotIs.value = activatedDotIs.value + 1;
      }
    }
  },
});

//rendered helper computed
let renderData = computed(() => {
  return {
    person: store.person,
    questions: store.questions,
    userAnswers: store.userAnswers,
  };
});
let activateDot = (i) => {
  activatedDotIs.value = i;
  let tl = gsap.timeline({ defaults: { duration: 0.2, ease: "circle" } });
  tl.to(questionCard.value, { opacity: 0 });
  tl.from(questionCard.value, { x: -100, opacity: 0 });
  tl.set(questionCard.value, { y: 0, opacity: 1, zIndex: -3 });
};
let enteringFrom = () => {
  gsap.set(card.value, { opacity: 1, y: 0 });
  gsap.from(card.value, {
    opacity: 0,
    y: -150,
    ease: "ease",
  });
  gsap.set(questionCard.value, { y: 0, opacity: 1 });
  gsap.from(questionCard.value, { y: 400, opacity: 0 });
};
let xPathArray = [];
onMounted(() => {
  storeVuex.dispatch("getFinalPerson");
  if (!store.questions.length) {
    storeVuex.dispatch("getQusetions");
  }
  if (!store.userAnswers.length) {
    storeVuex.dispatch("getUserResults");
  }
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
    margin: 0;
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