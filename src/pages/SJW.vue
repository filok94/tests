<template>
  <router-view @is-button-shown="isButtonShownMethod"></router-view>
  <button
    @click.prevent="nextQuestion(String(route.params.step))"
    v-show="isButtonShown"
    ref="button"
  >{{ buttonName }}</button>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch, Ref } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { getDatabase, set, ref as fireRef } from "firebase/database";
import { useAppearenceFromBottom } from "../components/Animations";
import { useSjwStore } from "../stores/sjw";
import { storeToRefs } from "pinia";

const { questions, userAnswers, computedFinalPerson } = storeToRefs(useSjwStore())

const router = useRouter();
const route = useRoute();
const isButtonShownMethod = (e: boolean) => {
  isButtonShown.value = e
}

interface DataToPost {
  answers: any,
  person: any
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
    console.log("this is " + route.name);
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
watch(isButtonShown, () => {
  useAppearenceFromBottom(button.value, 100)
});
//key contolls
let keyContolls = (e: KeyboardEvent) => {
  if (button.value?.style.display != "none")
    if (e.key == "Enter") {
      nextQuestion(String(route.params.step));
    }
};
onMounted(() => {
  document.addEventListener("keydown", keyContolls);
});
onUnmounted(() => document.removeEventListener("keydown", keyContolls));
</script>
<style lang="scss" scoped>
button {
  @include primary-button();
  color: $grey-color;
  max-width: 25rem;
  width: 50%;

  margin: 2rem auto;
  position: fixed;
  top: 80vh;
  right: 0;
  left: 0;
  z-index: 2;
}
@media (min-width: $medium-screen) {
  button {
    margin: 0 auto;
  }
}
</style>