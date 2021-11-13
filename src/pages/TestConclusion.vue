<template>
  <!-- <div class="conclusion-wrapper" v-if="isLoaded">
    <div id="conclusion-card">
      <img :src="userRatingInfoHelper.img" alt width="150" />
      <h2>Вы {{ userRatingInfoHelper.title }}</h2>
      <p>{{ userRatingInfoHelper.description }}</p>
      <p>
        Ваш результат: {{ userRatingInfoHelper.userRating }} из
        {{ store.questions.length }}
      </p>
    </div>
    <ul id="conclusion-dots-container">
      <li
        class="conclusion-dots"
        v-for="(question, i) in userRatingInfoHelper.questions"
        :key="i"
        @click="activateQuestionFromList(i)"
      ></li>
    </ul>

    <div class="conclusion-answer-card">
      <h2 class="conclusion-answer-card-head">
        {{ selectedQuestion.question }}
      </h2>
      <p>
        <span>Правильный ответ:</span>
        {{ selectedQuestion.rightAnswer }}
      </p>
      <p>Ваш ответ: {{ selectedQuestion.yourAnswer }}</p>
    </div>
  </div> -->
  <div class="test-wrapper">
    <div v-if="test">{{ test }}</div>
    <Loading v-else />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import Loading from "../components/Loading.vue";

const storeVuex = useStore();
const store = storeVuex.state.sjw;
let test = computed(() => {
  return storeVuex.getters.computedFinalPerson;
});
const getResultInfo = () => {
  storeVuex.dispatch("getResultsFromServer");
  storeVuex.dispatch("getPersonFromServer");
};
onMounted(() => {
  getResultInfo();
});
</script>

<style lang="scss" scoped>
.test-wrapper {
  margin: 10rem auto;
  height: 50%;
}

@media (min-width: $large-screen) {
  #conclusion-dots-container {
    width: 50%;
  }
}
</style>