<template>
  <router-view @is-button-shown="(e) => (isButtonShown = e)"></router-view>
  <button
    @click.prevent="nextQuestion(route.params.step)"
    v-show="isButtonShown"
    ref="button"
  >
    {{ buttonName }}
  </button>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";
import { getDatabase, set, ref as fireRef } from "firebase/database";
import gsap from "gsap";
const store = useStore();
const router = useRouter();
const route = useRoute();
const postUserFinalResult = async (data) => {
  let userId = window.localStorage.getItem("isAuthedById");
  const db = getDatabase();
  try {
    await set(fireRef(db, `users/${userId}/SJW_result/`), data);
  } catch (err) {
    console.log(err.message);
  }
};
//нажатие на кнопку передает в стор, какой блок вопросов сейчас рендерить, и пушит следующий роут в УРЛ
const isButtonShown = ref(false);
let button = ref(null);
const buttonName = ref("Next");

const nextQuestion = (i) => {
  if (route.params.step < store.state.sjw.questions.length) {
    router.push({ name: "sjw-question", params: { step: Number(i) + 1 } });
  } else if (route.name == "Conclusion") {
    console.log("this is " + route.name);
    router.push({
      name: "User",
      params: { userName: window.localStorage.getItem("isAuthedBy") },
    });
  } else {
    postUserFinalResult({
      answers: store.state.sjw.userAnswers,
      person: store.getters.computedFinalPerson,
    });
    router.push({ name: "Conclusion" });
  }
};

onBeforeRouteUpdate((to, from) => {
  Number(to.params.step) == store.state.sjw.questions.length
    ? (buttonName.value = "End")
    : (buttonName.value = "Next");
});
watch(isButtonShown, () => {
  gsap.set(button.value, { opacity: 1, y: 0 });
  gsap.from(button.value, { y: 100, opacity: 0 });
});
//key contolls
let keyContolls = (e) => {
  if (button.value.style.display != "none")
    if (e.key == "Enter") {
      nextQuestion(route.params.step);
    }
};
onMounted(() => {
  document.addEventListener("keydown", keyContolls);
});
onUnmounted(() => document.removeEventListener("keydown", keyContolls));
</script>
<style lang="scss" scoped>
button {
  cursor: pointer;
  background: $prim-color;
  border: none;
  border-radius: 15px;
  padding: 1rem;
  font-size: 1rem;
  font-family: $font;
  transition: 0.3s ease-out;
  color: $grey-color;
  max-width: 25rem;
  width: 50%;

  margin: 2rem auto;
  position: fixed;
  top: 80vh;
  right: 0;
  left: 0;
  z-index: 2;
  &:hover {
    transform: scale(130%);
  }
}
@media (min-width: $medium-screen) {
  button {
    margin: 0 auto;
  }
}
</style>