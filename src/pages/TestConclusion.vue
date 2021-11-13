<template>
  <!-- <div class="conclusion-wrapper" v-if="isLoaded">
    <div id="conclusion-card">
      <img :src="finalPerson.img" alt width="150" />
      <h2>Вы {{ finalPerson.title }}</h2>
      <p>{{ finalPerson.description }}</p>
      <p>
        Ваш результат: {{ finalPerson.userRating }} из
        {{ store.questions.length }}
      </p>
    </div>
    <ul id="conclusion-dots-container">
      <li
        class="conclusion-dots"
        v-for="(question, i) in finalPerson.questions"
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
  <transition mode="out-in" @enter="enteringFrom">
    <div v-if="finalPerson" class="person-card" ref="card">
      <img :src="finalPerson.img" alt width="150" />
      <h2>
        <a :href="finalPerson.src">Вы {{ finalPerson.title }}</a>
      </h2>
      <p>{{ finalPerson.description }}</p>
      <p>
        Результат: <span>{{ userRating }}</span> из
        {{ questions.length }}
      </p>
    </div>
    <Loading v-else />
  </transition>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import Loading from "../components/Loading.vue";
import gsap from "gsap";

const storeVuex = useStore();
const store = storeVuex.state.sjw;
let finalPerson = computed(() => store.person);
let questions = computed(() => store.questions);
let userRating = computed(() => storeVuex.getters.computedFinalPerson);

let card = ref(null);
let enteringFrom = () => {
  // gsap.set(answerElement.value, { opacity: 1, x: 0 });
  gsap.set(card.value, { opacity: 1, y: 0 });
  // gsap.from(answerElement.value, {
  //   opacity: 0,
  //   x: -100,
  //   ease: "ease",
  // });
  gsap.from(card.value, {
    opacity: 0,
    y: -150,
    ease: "ease",
  });
};
onMounted(() => {
  storeVuex.dispatch("getFinalPerson");
  if (!store.questions.length) {
    storeVuex.dispatch("getInfoFromServer");
  }
});
</script>

<style lang="scss" scoped>
.person-card {
  @include card-bcg();
  padding: 1.5rem;
  text-align: left;
  display: grid;
  max-width: 80%;
  margin-right: auto;
  margin-left: auto;
  grid-template-rows: repeat (4, 1fr);
  grid-template-columns: minmax(10%, 80vw);
  img {
    right: -30%;
    border-radius: 15px;
    max-width: 90%;
    justify-self: center;
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

@media (min-width: $large-screen) {
  .person-card {
    width: 50%;
  }
}
</style>