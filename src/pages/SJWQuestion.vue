<template>
  <transition @enter="enteringFrom" mode="out-in">
    <div v-if="shownNowQuestion" class="sjw-wrapper">
      <div class="question-block" ref="questionElement">
        <h1>{{ shownNowQuestion.question }}</h1>
      </div>

      <div class="answer-block" ref="answerElement">
        <ul>
          <li
            v-for="(answer, i) of shownNowQuestion.answers"
            :key="i"
            @click.prevent="chooseAnswer(i)"
            :ref="
              (el) => {
                if (el) allAnswersRefs[i] = el;
              }
            "
            :class="{
              'active-answer': isActive,
              right:
                usersChoice == i &&
                usersChoice != null &&
                usersChoice == shownNowQuestion.rightAnswer,
              wrong:
                usersChoice == i &&
                usersChoice != null &&
                usersChoice != shownNowQuestion.rightAnswer,
            }"
          >
            <p class="answer-count-label">{{ i + 1 }}</p>
            <p class="answer-text">{{ answer }}</p>
          </li>
        </ul>
      </div>
    </div>
    <Loading v-else />
  </transition>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { useStore } from "vuex";
import {
  useAppearenceFromTop,
  useAppearenceFromLeft,
} from "../components/Animations";
import Loading from "../components/Loading.vue";

const route = useRoute();
const store = useStore();
const emit = defineEmits(["is-button-shown"]);

//отрендеренный вопрос
const shownNowQuestion = computed(() => {
  return store.state.sjw.questions[Number(route.params.step) - 1];
});
//answers are inActive and active
const isActive = ref(true);
const allAnswersRefs = ref([]);
const usersChoice = ref(null);
const chooseAnswer = (i) => {
  if (isActive.value) {
    store.commit("СHOOSE_QUESTION", {
      answer: i,
      number: route.params.step - 1,
    });
    isActive.value = false;
    usersChoice.value = i;
    emit("is-button-shown", !isActive.value);
  }
};

//key controlls
let keyContolls = (event) => {
  allAnswersRefs.value.forEach((e, index) => {
    if (event.key == index + 1) {
      chooseAnswer(index);
    }
  });
};
const isLoading = ref(true);
const questionElement = ref(null);
const answerElement = ref(null);
let enteringFrom = () => {
  useAppearenceFromLeft(answerElement.value, 100);
  useAppearenceFromTop(questionElement.value, 150);
};
onMounted(async () => {
  await store.dispatch("getQusetions");
  await store.dispatch("getAllPersons");
  isLoading.value = false;
  enteringFrom()
});
onMounted(() => {
  document.addEventListener("keydown", keyContolls);
});
onUnmounted(() => {
  document.removeEventListener("keydown", keyContolls);
});
//delete all classes and instance value everytime
onBeforeRouteUpdate((to, from) => {
  isActive.value = true;
  usersChoice.value = null;
  emit("is-button-shown", !isActive.value);
  enteringFrom();
});
</script>

<style lang="scss" scoped>
//static classes
.question-block {
  margin: 0 0 2rem 0;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap-reverse;
  max-width: 70vw;
  h1 {
    text-align: start;
    font-size: 1.8rem;
  }
}
.answer-block {
  margin: 2rem 0;
  ul {
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 350px));
    grid-gap: 1.5rem;
    justify-content: start;
    min-width: 70vw;
    li {
      padding: 1.3rem;
      list-style-type: none;
      margin: 0;
      text-align: start;
      font-size: 1.1rem;
      color: $grey-color;
      transition: 0.3s ease-in-out;
      @include card-bcg();
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      p {
        margin: 0;
        padding: 0;
      }
      .answer-count-label {
        font-size: 2rem;
        color: $prim-text;
      }
    }
    .right {
      @include right-wrong($right-gradient);
    }
    .wrong {
      @include right-wrong($bad-gradient);
    }
  }
  .active-answer {
    cursor: pointer;

    &:hover {
      .answer-count-label {
        transform: scale(101%);
        background: $gradient;
        @include bcg-for-text();
      }
    }
  }
}
</style>