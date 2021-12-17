<template>
  <div class="trigger-game-container">
    <div class="trigger-head">
      <h1 id="trigger-name">Trigger Game</h1>
      <ul class="trigger-rules-container">
        <li v-for="rule in triggerRules" class="trigger-rule">{{ rule }}</li>
      </ul>
    </div>
    <div class="warriors-container">
      <div class="warrior-card" v-for="warrior in femWarriors">
        <img :src="warrior.imageUrl" alt />
        <h2>{{ warrior.name }}</h2>
      </div>
    </div>
  </div>
  <router-view v-if="isWarrior"></router-view>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex'
let store = useStore()
let triggerRules = ['Вам нужно выбрать бойца из представленных ниже феминисток',
  "Начать игру за выбранного бойца", "На экране будут показываться триггеры, на которые ваш боец должен отреагировать",
  "Если вы отвечаете согласно системы моральных координат вашего бойца, вам засчитываются баллы",
  "Пройдите игру за всех бойцов и узнайте, кто вы в мире феминизма"]
let isWarrior = ref(false)

let femWarriors = computed(() => store.state.trigger.warriorCards)
</script>

<style lang='scss' scoped>
.trigger-game-container {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  margin: 3rem;
  .trigger-head {
    #trigger-name {
      text-align: left;
    }
    ul {
      display: flex;
      flex-direction: column;
      padding: 0;
      li {
        list-style-type: none;
        text-align: left;
        margin: 0.5rem 0;
        &::before {
          content: "👩🏾‍🎤 ";
        }
      }
    }
  }
  .warriors-container {
    display: flex;
    padding: 0;
    .warrior-card {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
      padding: 1rem;
      margin: 0;
    }
  }
}
</style>