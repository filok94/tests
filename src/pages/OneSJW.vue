<script lang="ts" setup>
import { ref, Ref, computed } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { getDatabase, set, ref as fireRef } from "firebase/database";
import { useSjwStore } from "../stores/sjw";
import { storeToRefs } from "pinia";
import VButton from "../components/vButton.vue";
import { PersonType } from "../types/testsTypes.interface";

const { questions, userAnswers, computedFinalPerson } = storeToRefs(
  useSjwStore()
);

const router = useRouter();
const route = useRoute();
const isButtonShownMethod = (e: boolean) => (isButtonShown.value = e);
const isButtonPrimary = computed(() =>
  isButtonShown.value ? "primary" : "cancel"
);
interface DataToPost {
  answers: {
    answerIs: number;
    isRight: boolean;
  }[];
  person: PersonType | null;
}
const postUserFinalResult = async (data: DataToPost) => {
  let userId = window.localStorage.getItem("isAuthedById");
  const db = getDatabase();
  try {
    await set(fireRef(db, `users/${userId}/SJW_result/`), data);
  } catch (err) {
    console.log(err);
  }
};
//нажатие на кнопку передает в стор, какой блок вопросов сейчас рендерить, и пушит следующий роут в УРЛ
const isButtonShown = ref(false);
let button: Ref<null | HTMLElement> = ref(null);
const buttonName = ref("Next");

const nextQuestion = (i: string) => {
  if (Number(i) < questions.value.length) {
    router.push({ name: "sjw-question", params: { step: Number(i) + 1 } });
  } else if (route.name == "Conclusion") {
    router.push({
      name: "User",
      params: { userName: window.localStorage.getItem("isAuthedBy") },
    });
  } else {
    postUserFinalResult({
      answers: userAnswers.value,
      person: computedFinalPerson.value,
    });
    router.push({ name: "Conclusion" });
  }
};

onBeforeRouteUpdate((to) => {
  Number(to.params.step) == questions.value.length
    ? (buttonName.value = "End")
    : (buttonName.value = "Next");
});
//key contolls
let keyContolls = (e: KeyboardEvent) => {
  if (e.code == "Enter" && isButtonShown.value) {
    nextQuestion(String(route.params.step));
  }
};
</script>

<template>
  <router-view @is-button-shown="isButtonShownMethod"></router-view>
  <!-- <transition @enter="test($event)" @leave="testAway($event)" mode="out-in"> -->
  <v-button
    id="test"
    ref="button"
    :disable="!isButtonShown"
    :purpose="isButtonPrimary"
    @click.prevent="nextQuestion(String(route.params.step))"
    @entered="keyContolls($event)"
    >{{ buttonName }}</v-button
  >
  <!-- </transition> -->
</template>

<style lang="scss" scoped>
#test {
  position: fixed;
  top: 80vh;
  right: 0;
  left: 0;
  margin: 0 auto;
}
</style>
