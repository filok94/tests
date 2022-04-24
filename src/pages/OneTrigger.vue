<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import { useTriggerStore } from "../stores/trigger";
import { useRouter } from "vue-router";
import { Animations } from "../Helpers/Animations/CommonAnimations";
import Loading from "../components/OneLoading.vue";
import { WarriorCardType } from "../types/testsTypes.interface";
import VButton from "../components/vButton.vue";

let triggerStore = useTriggerStore();
let router = useRouter();
let triggerRules = [
  "Вам нужно выбрать бойца из представленных ниже феминисток",
  "Начать игру за выбранного бойца",
  "На экране будут показываться триггеры, на которые ваш боец должен отреагировать",
  "Если вы отвечаете согласно системы моральных координат вашего бойца, вам засчитываются баллы",
  "Пройдите игру за всех бойцов и узнайте, кто вы в мире феминизма",
];

let isRulesShown = ref(false);

let femWarriors = computed(() =>
  triggerStore.warriorCards.length > 0 ? triggerStore.warriorCards : false
);
let activeCardIs = ref<WarriorCardType | null>(null);
let activateCard = (el: WarriorCardType) => {
  activeCardIs.value = el;
};

//дизейблить кнопку начала игры за бойца, если уже пройдено
let isCardHaveResultAlready = computed(() => {
  let indexesWithAnswer: number[] = [];
  triggerStore.triggerAnswersResults?.forEach((e, index) => {
    e !== 0 ? indexesWithAnswer.push(index) : false;
  });
  return indexesWithAnswer;
});

let isWarriorTestStarted = ref(false);
let startTheTestForChosenWarrior = (warrior: WarriorCardType) => {
  isWarriorTestStarted.value = !isWarriorTestStarted.value;
  triggerStore.activeTriggerCardIs = warrior;
  router.push({ name: "TriggerGame" });
};
let endTheTestAndCloseModal = () => {
  router.go(-1);
  isWarriorTestStarted.value = false;
};

//Если все карточки пройдены, то появляется возможность завершить игру
let conclusionIsShown = ref(false);
let allGameEndedButton = ref(null);
let computeAllGamesAreEnded = computed(
  () => !triggerStore.triggerAnswersResults?.includes(0)
);

let buttonEnteringFromBottom = () =>
  Animations.fromBottom(100, allGameEndedButton.value);
let goToEndingSection = () => {
  conclusionIsShown.value = true;
  router.push({ name: "TriggerConclusion" });
};

//Анимация появления
let triggerTitle = ref<null | HTMLElement>(null);
let triggerRulesRef = ref<null | HTMLElement>(null);
let triggerCardsContainer = ref<null | HTMLElement>(null);
let entering = () => {
  Animations.fromTop(300, triggerTitle.value);
  Animations.fromLeft(300, triggerRulesRef.value);
  Animations.fromLeft(300, triggerCardsContainer.value);
};
//Запрос всех данных для игры

let wasTestEnded = computed(() => triggerStore.wasTestEnded);
onMounted(async () => {
  if (!femWarriors.value) {
    await triggerStore.getTriggerGame();
  }
  await triggerStore.getCurrentUserResults();
  await triggerStore.getIfTheTestWasEnded();

  if (wasTestEnded.value) {
    goToEndingSection();
  }
  entering();
});
</script>

<template>
  <transition @enter="entering">
    <div
      v-if="femWarriors"
      class="trigger-game-container"
      :class="{
        'opacity-while-modal': isWarriorTestStarted || conclusionIsShown,
      }"
    >
      <div class="trigger-head">
        <h1 id="trigger-name" ref="triggerTitle">Trigger Game</h1>
        <div ref="triggerRulesRef" class="trigger-rules-container">
          <div
            class="trigger-rules-header"
            @click="isRulesShown = !isRulesShown"
          >
            <img
              class="rule-header-icon"
              src="https://img.icons8.com/glyph-neue/64/ffffff/info.png"
            />
            <h2 class="trigger-rule-name"><span>П</span>равила</h2>
          </div>
          <ul v-if="isRulesShown" class="rules-list">
            <li v-for="rule in triggerRules" :key="rule" class="trigger-rule">
              {{ rule }}
            </li>
          </ul>
        </div>
      </div>
      <div ref="triggerCardsContainer" class="warriors-container">
        <div
          v-for="(warrior, index) in femWarriors"
          :key="index"
          class="warrior-card"
          @click.prevent="activateCard(warrior)"
        >
          <img :src="warrior.imageUrl" />
          <h2 class="card-name">{{ warrior.name }}</h2>
          <button
            class="start-card-button"
            :disabled="
              isCardHaveResultAlready.includes(index) ||
              wasTestEnded ||
              isWarriorTestStarted
            "
            @click.prevent="startTheTestForChosenWarrior(warrior)"
          >
            {{
              isCardHaveResultAlready.includes(index) || wasTestEnded
                ? `${warrior.name} уже закончила`
                : `Пройти за ${warrior.name}`
            }}
          </button>
        </div>
      </div>
    </div>
    <Loading v-else />
  </transition>
  <transition @enter="buttonEnteringFromBottom">
    <v-button
      v-if="
        (computeAllGamesAreEnded &&
          !isWarriorTestStarted &&
          !conclusionIsShown) ||
        (wasTestEnded && !conclusionIsShown)
      "
      ref="allGameEndedButton"
      :purpose="'primary'"
      @click.prevent="goToEndingSection"
      >Узнать, кто же я</v-button
    >
  </transition>
  <div v-if="conclusionIsShown || isWarriorTestStarted" class="dark-bcg"></div>
  <router-view
    v-if="isWarriorTestStarted"
    @close-trigger-modal="endTheTestAndCloseModal"
  ></router-view>
  <router-view v-if="conclusionIsShown"></router-view>
</template>

<style lang="scss" scoped>
//dynamic-css
$cardWidth: 10rem;

// $cardHeight: calc($cardWidth + 5.7rem);
.card-boarded {
  outline: solid $color-violet 0.1rem;

  h2 {
    background: $gradient;
    @include bcg-for-text;
  }
}

.dark-bcg {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background: rgba($color: #00000049, $alpha: 0.5);
  backdrop-filter: blur(3px);
  z-index: 2;
}

//static-css
.trigger-game-container {
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(2rem, 1fr));
  margin: 1rem;

  .trigger-head {
    #trigger-name {
      text-align: left;
    }

    .trigger-rules-container {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      @include blur-bcg;
      box-shadow: $shadow-black;
      border-radius: $border-prime;
      background: $color-black-opacity;
      margin-bottom: 1rem;
      width: fit-content;
      padding-right: 3rem;

      .trigger-rules-header {
        display: flex;
        align-items: center;
        cursor: pointer;

        .rule-header-icon {
          max-width: 10%;
          max-height: 2rem;
          margin-right: 1rem;
        }

        .trigger-rule-name {
          text-align: left;
          font-weight: bold;

          span {
            background: $gradient;
            @include bcg-for-text;
          }
        }

        &:focus {
          outline: solid $color-violet 0.1rem;
        }
      }

      .rules-list {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;

        .trigger-rule {
          list-style-type: none;
          text-align: left;
          margin: 0.5rem 0;

          &::before {
            content: "👩🏾‍🎤 ";
          }
        }
      }

      &:hover {
        outline: solid $color-violet 0.1rem;
      }
    }
  }

  .warriors-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    padding: 0;
    gap: 0.5rem;

    .warrior-card {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
      padding: 0;
      margin: 0;
      border-radius: $border-prime;
      background: $color-black-opacity;
      @include blur-bcg();
      width: $cardWidth;
      height: 15rem;

      img {
        width: 5rem;
        margin: 0.3rem;
      }

      .card-name {
        margin: 0.3rem;
      }

      .start-card-button {
        border: none;
        border-radius: 0 0 25px 25px;
        outline-style: unset;
        cursor: pointer;

        padding: 0.4rem;
        width: 100%;

        min-height: 20%;

        background: $gradient;
        color: $color-white;

        font-family: $font;
        font-weight: bold;
        font-size: 1rem;

        &:disabled {
          background: $color-grey;
          color: black;
        }
      }

      &:hover {
        outline: solid $color-violet 0.1rem;

        h2 {
          background: $gradient;
          @include bcg-for-text;
        }
      }

      &:target {
        outline: solid $color-violet 0.1rem;
      }
    }
  }
}

.end-test-button {
  position: fixed;
  width: 15rem;
  bottom: 10vh;
  margin: 0 auto;
  left: 0;
  right: 0;
  @include primary-button();
}

@media (min-width: $medium-screen) {
  .warriors-container {
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(3rem, 14rem));

    .warrior-card {
      width: 100% !important;
      height: 25rem;

      img {
        width: 6rem !important;
      }

      .start-card-button {
        height: 29% !important;
      }
    }
  }
}
</style>
