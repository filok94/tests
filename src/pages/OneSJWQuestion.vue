<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { Animations } from "../Helpers/Animations";
import Loading from "../components/OneLoading.vue";
import { useSjwStore } from "../stores/sjw";
import { useEventListener } from "@vueuse/core";
import vCard from "../components/vCard.vue";

const sjwStore = useSjwStore();
const route = useRoute();

let emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (ev: "is-button-shown", value: boolean): void;
}>();

//отрендеренный вопрос
const shownNowQuestion = computed(() => {
  return sjwStore.questions[Number(route.params.step) - 1];
});
//answers are inActive and active
const isActive = ref(true);
let allAnswersRefs = ref<never | HTMLElement[]>([]);
const usersChoice = ref<null | number>(null);
const chooseAnswer = (i: number) => {
  if (isActive.value) {
    sjwStore.chooseQuestion({
      answer: i,
      number: Number(route.params.step) - 1,
    });
    isActive.value = false;
    usersChoice.value = i;
    emit("is-button-shown", !isActive.value);
  }
};

//key controlls
let keyContolls = (event: KeyboardEvent) => {
  allAnswersRefs.value.forEach((e, index) => {
    if (Number(event.key) == index + 1) {
      chooseAnswer(index);
    }
  });
};
const isLoading = ref(true);
const questionElement = ref(null);
const answerElement = ref<HTMLElement | null>(null);
let enteringFrom = () => {
  Animations.fromLeft(100, answerElement.value);
  Animations.fromTop(150, questionElement.value);
};
onMounted(async () => {
  console.log(allAnswersRefs.value.length);
  await sjwStore.getQusetions();
  await sjwStore.getAllPersons();
  isLoading.value = false;
  enteringFrom();
});
useEventListener(document, "keyup", keyContolls);
//delete all classes and instance value everytime
onBeforeRouteUpdate(() => {
  isActive.value = true;
  usersChoice.value = null;
  emit("is-button-shown", !isActive.value);
  enteringFrom();
});
</script>

<template>
  <transition mode="out-in" @enter="enteringFrom">
    <div v-if="shownNowQuestion" class="sjw-wrapper">
      <div ref="questionElement" class="question-block">
        <h1>{{ shownNowQuestion.question }}</h1>
      </div>

      <div ref="answerElement" class="answer-block">
        <ul>
          <v-card
            v-for="(answer, i) of shownNowQuestion.answers"
            :ref="
            (el: HTMLElement | any) => {
              if (el) allAnswersRefs[i] = el;
            }
          "
            :key="i"
            :hover="{ isHoverable: isActive, onElement: 'description' }"
            :description="answer"
            class="static-answer"
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
            @click.prevent="chooseAnswer(i)"
          >
            <p class="answer-count-label">{{ i + 1 }}</p>
          </v-card>
        </ul>
      </div>
    </div>
    <Loading v-else />
  </transition>
</template>

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

    .right {
      @include right-wrong($gradient-green);

      p {
        transform: scale(130%);
      }
    }

    .wrong {
      @include right-wrong($gradient-red);

      p {
        transform: scale(130%);
      }
    }
  }

  .active-answer {
    &:hover {
      .answer-count-label {
        transform: scale(130%);
        background: $gradient;
        @include bcg-for-text();
      }
    }
  }
}

.static-answer {
  padding: 1rem;
}

p {
  margin: 0;
  padding: 0;
}

.answer-count-label {
  font-size: 2rem;
  color: $color-white;
  transition: 0.3s ease;
}
</style>
