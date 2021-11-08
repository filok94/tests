<template>
  <div class="question-block">
    <h1>{{ shownNowQuestion.question }}</h1>
  </div>
  <div class="answer-block">
    <ul>
      <li
        v-for="(answer, i) of shownNowQuestion.answers"
        :key="i"
        @click.prevent="chooseAnswer(i)"
        :ref="setAllAnswersRefs"
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
        <p>{{ answer }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref } from "vue";
import {
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
  useRoute,
  useRouter,
} from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const route = useRoute();
const store = useStore();
//отрендеренный вопрос
const shownNowQuestion = computed(() => {
  return store.state.sjw.questions[route.params.step - 1];
});
//answers are inActive and active
const isActive = ref(true);
const allAnswersRefs = [];
const usersChoice = ref(null);
let setAllAnswersRefs = (el) => {
  if (el) allAnswersRefs.push(el);
};
const chooseAnswer = (i) => {
  if (isActive.value) {
    let isAnswerTrue = null;
    if (i === shownNowQuestion.value.rightAnswer) {
      isAnswerTrue = true;
    } else {
      isAnswerTrue = false;
    }
    store.commit("СHOOSE_QUESTION", {
      answer: isAnswerTrue,
      number: route.params.step - 1,
    });
    isActive.value = false;
    usersChoice.value = i;
  }
};
//delete all classes and instance value everytime
onBeforeRouteUpdate((to, from) => {
  isActive.value = true;
  usersChoice.value = null;
});
</script>

<style lang="scss" scoped>
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
      padding: 1rem;
      list-style-type: none;
      margin: 0;
      text-align: start;
      font-size: 1.1rem;
      color: $grey-color;
      transition: 0.3s ease-in-out;
      @include card-bcg();
    }
    p {
      margin: 0;
      padding: 0;
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
      @include right-wrong($gradient, 101%);
    }
  }
}
</style>