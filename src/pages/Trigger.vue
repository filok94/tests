<template>
  <transition @enter="entering">
    <div
      class="trigger-game-container"
      :class="{ 'opacity-while-modal': isWarriorTestStarted || conclusionIsShown }"
      v-if="femWarriors"
    >
      <div class="trigger-head">
        <h1 id="trigger-name" ref="triggerTitle">Trigger Game</h1>
        <div class="trigger-rules-container" ref="triggerRulesRef">
          <div class="trigger-rules-header" @click="isRulesShown = !isRulesShown">
            <img
              class="rule-header-icon"
              src="https://img.icons8.com/glyph-neue/64/ffffff/info.png"
            />
            <h2 class="trigger-rule-name">
              <span>П</span>равила
            </h2>
          </div>
          <ul class="rules-list" v-if="isRulesShown">
            <li v-for="rule in triggerRules" class="trigger-rule">{{ rule }}</li>
          </ul>
        </div>
      </div>
      <div class="warriors-container" ref="triggerCardsContainer">
        <div
          class="warrior-card"
          v-for="(warrior, index) in femWarriors"
          @click.prevent="activateCard(warrior)"
        >
          <img :src="warrior.imageUrl" alt />
          <h2 class="card-name">{{ warrior.name }}</h2>
          <button
            class="start-card-button"
            :disabled="isCardHaveResultAlready.includes(index) || wasTestEnded || isWarriorTestStarted"
            @click.prevent="startTheTestForChosenWarrior(warrior)"
          >{{ isCardHaveResultAlready.includes(index) || wasTestEnded ? `${warrior.name} уже закончила` : `Пройти за ${warrior.name}` }}</button>
        </div>
      </div>
    </div>
    <Loading v-else />
  </transition>
  <transition @enter="buttonEnteringFromBottom">
    <button
      class="end-test-button"
      v-if="(computeAllGamesAreEnded && !isWarriorTestStarted && !conclusionIsShown) || (wasTestEnded && !conclusionIsShown)"
      ref="allGameEndedButton"
      @click.prevent="goToEndingSection"
    >Узнать, кто же я</button>
  </transition>
  <div class="dark-bcg" v-if="conclusionIsShown || isWarriorTestStarted"></div>
  <router-view v-if="isWarriorTestStarted" @close-trigger-modal="endTheTestAndCloseModal"></router-view>
  <router-view v-if="conclusionIsShown"></router-view>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useAppearenceFromBottom, useAppearenceFromLeft, useAppearenceFromTop } from '../components/Animations.js'
import Loading from '../components/Loading.vue'

let router = useRouter()
let store = useStore()
let triggerRules = ['Вам нужно выбрать бойца из представленных ниже феминисток',
  "Начать игру за выбранного бойца", "На экране будут показываться триггеры, на которые ваш боец должен отреагировать",
  "Если вы отвечаете согласно системы моральных координат вашего бойца, вам засчитываются баллы",
  "Пройдите игру за всех бойцов и узнайте, кто вы в мире феминизма"]

let isRulesShown = ref(false)

let femWarriors = computed(() => store.state.trigger.warriorCards.length > 0 ? store.state.trigger.warriorCards : false)
let activeCardIs = ref(null)
let activateCard = (el) => {
  if (!el.isThisTestEnded) {
    activeCardIs.value = el
  }
}

//дизейблить кнопку начала игры за бойца, если уже пройдено
let isCardHaveResultAlready = computed(() => {
  let indexesWithAnswer = []
  store.state.trigger.triggerAnswersResults.forEach((e, index) => {
    e !== null ? indexesWithAnswer.push(index) : undefined
  })
  return indexesWithAnswer
})

let isWarriorTestStarted = ref(false)
let startTheTestForChosenWarrior = (warrior) => {
  isWarriorTestStarted.value = !isWarriorTestStarted.value
  store.state.trigger.activeTriggerCardIs = warrior
  router.push({ name: 'TriggerGame' })
}
let endTheTestAndCloseModal = () => {
  router.go(-1)
  isWarriorTestStarted.value = false
}

//Если все карточки пройдены, то появляется возможность завершить игру
let conclusionIsShown = ref(false)
let allGameEndedButton = ref(null)
let computeAllGamesAreEnded = computed(() => !store.state.trigger.triggerAnswersResults.includes(null))
let buttonEnteringFromBottom = (() => useAppearenceFromBottom(allGameEndedButton.value, 100))
let goToEndingSection = () => {
  conclusionIsShown.value = true
  router.push({ name: 'TriggerConclusion' })
}

//Анимация появления
let triggerTitle = ref(null)
let triggerRulesRef = ref(null)
let triggerCardsContainer = ref(null)
let entering = () => {
  useAppearenceFromTop(triggerTitle.value, 300)
  useAppearenceFromLeft(triggerRulesRef.value, 300)
  useAppearenceFromLeft(triggerCardsContainer.value, 300)
}
//Запрос всех данных для игры
let wasTestEnded = computed(() => store.state.trigger.wasTestEnded)
onMounted(async () => {
  if (!femWarriors.value) {
    store.dispatch("getTriggerGame")
  }
  await store.dispatch("getIfTheTestWasEnded")
  if (wasTestEnded.value) {
    store.dispatch("getCurrentUserResults")
  }
  entering()
})

</script>

<style lang='scss' scoped>
//dynamic-css
$cardWidth: 9rem;
$cardHeight: calc($cardWidth * 2);
.card-boarded {
  outline: solid $prim-color 0.1rem;
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
      @include card-bcg;
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
          outline: solid $prim-color 0.1rem;
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
        outline: solid $prim-color 0.1rem;
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
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
      padding: 0;
      margin: 0;
      @include card-bcg();
      width: $cardWidth;
      height: $cardHeight;
      img {
        width: 5rem;
        margin: 0.3rem;
        margin: 1rem;
      }
      .card-name {
        margin: 1rem;
      }
      .start-card-button {
        border: none;
        border-radius: 0 0 25px 25px;
        outline-style: unset;
        cursor: pointer;

        padding: 0.4rem;
        width: 100%;
        height: auto;

        background: $gradient;
        color: $prim-text;

        font-family: $font;
        font-weight: bold;
        font-size: 1rem;
        &:disabled {
          background: $grey-color;
          color: black;
        }
      }
      &:hover {
        outline: solid $prim-color 0.1rem;
        h2 {
          background: $gradient;
          @include bcg-for-text;
        }
      }
      &:target {
        outline: solid $prim-color 0.1rem;
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
      height: 20rem;
      img {
        width: 8rem !important;
      }
      .start-card-button {
        // margin-top: 2rem;
        height: 29% !important;
      }
    }
  }
}
</style>