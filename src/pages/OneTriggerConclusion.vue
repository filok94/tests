<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useTriggerStore } from "../stores/trigger";
import { TriggerPerson } from "../types/testsTypes.interface";
import { onClickOutside } from "@vueuse/core";
import { Animations } from "../Helpers/Animations/CommonAnimations";
import Loading from "../components/OneLoading.vue";
import VButton from "../components/vButton.vue";
import { ROUTER_NAMES } from "../router";

let router = useRouter();
let triggerStore = useTriggerStore();

const conclusionCardRef = ref(null);
onClickOutside(conclusionCardRef, () => false);
let results = computed(() => triggerStore.triggerAnswersResults);
let finalPerson = computed<TriggerPerson | null>(() => {
  let result = 0;
  results.value.forEach((e) => (result += e));
  let level = 0;
  if (result > 8 && result < 13) {
    level = 1;
  } else if (result >= 13) {
    level = 2;
  }
  let computedResult: TriggerPerson = {
    description: "",
    level: 0,
    link: "",
    image: "",
    title: "",
  };
  triggerStore.triggerConclusionPersons.forEach((e) => {
    e.level === level ? (computedResult = e) : null;
  });
  triggerStore.changePerson(computedResult);
  return computedResult.title ? computedResult : null;
});

let wasTestEnded = computed(() => triggerStore.wasTestEnded);
let goBackToMainMenu = () => {
  if (!wasTestEnded.value) {
    triggerStore.postResults();
  }
  router.push({
    name: ROUTER_NAMES.main,
    params: { userId: window.localStorage.getItem("isAuthedBy") },
  });
};
let enterEventListener = (e: KeyboardEvent) => {
  if (e.code == "Enter") {
    goBackToMainMenu();
  }
};
onMounted(() => {
  triggerStore.getTriggerConclusion();
  document.addEventListener("keydown", enterEventListener);
  Animations.fromBottom(300, conclusionCardRef.value);
});
onUnmounted(() => {
  document.removeEventListener("keydown", enterEventListener);
});
</script>

<template>
  <div class="conclusion-container-visible">
    <transition>
      <div
        v-if="finalPerson"
        ref="conclusionCardRef"
        class="trigger-conclusion-container"
      >
        <img
          class="trigger-conclusion-image"
          :src="finalPerson.image"
          alt="image of fem"
        />
        <h1 class="trigger-conclusion-title">
          <a :href="finalPerson.link">{{ finalPerson.title }}</a>
        </h1>
        <h2 class="trigger-conclusion-description">
          {{ finalPerson.description }}
        </h2>
        <v-button :purpose="'primary'" @click.prevent="goBackToMainMenu"
          >Вернуться на главную</v-button
        >
      </div>
      <Loading v-else />
    </transition>
  </div>
</template>

<style scoped lang="scss">
.trigger-conclusion-container {
  position: absolute;
  top: 20%;
  margin: 0 1rem;
  left: 0;
  right: 0;
  background: $color-black-opacity;
  border-radius: $border-prime;
  box-shadow: $shadow-black;
  @include blur-bcg;
  padding: 2rem;
  z-index: 3;

  img {
    width: 15rem;
    border-radius: $border-minimal;
  }

  h1 {
    font-size: 3rem;
    background: $gradient;
    @include bcg-for-text;
    cursor: pointer;
    line-height: 2.9rem;
    margin: 0.8rem;

    a {
      text-decoration: none;
    }

    &:hover {
      text-decoration: underline;
      text-decoration-color: $color-pink;
      text-decoration-thickness: 0.125rem;
    }
  }

  h2 {
    font-size: 0.9rem;
    margin: 0;
    color: $color-grey;
  }
}

@media (min-width: $large-screen) {
  .trigger-conclusion-container {
    width: 60%;
    margin: 0 auto;
  }
}
</style>
