<template>
    <div class="question-block">
        <h1>{{ currentBlock.question }}</h1>
        <img :src="image" alt="question-image" width="300" />
    </div>
    <div class="answer-block">
        <ul>
            <Answer
                v-for="(answer, i) in currentBlock.answers"
                :key="i"
                :thisAnswer="answer"
                :thisNumber="i"
                :currentBlock="currentBlock"
            />
        </ul>
    </div>
</template>

<script setup>

import { ref, computed } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router';
import { useStore } from "vuex";
import Answer from "../components/Answer.vue";
const store = useStore()

//сообщаем компоненту, что сейчас надо рендерить
const currentBlock = ref(store.state.sjw.questionBlock[store.state.sjw.currentBlock])

//при смене УРЛа сообщаем комопненту, что необходимо перерендерить данные
onBeforeRouteUpdate((to, from) => {
    if (to.params.questionNumber !== from.params.questionNumber) {
        currentBlock.value = store.state.sjw.questionBlock[to.params.questionNumber - 1]
    }
})
//фото для вопроса
let image = computed(() => `/${currentBlock.value.image}.png`)
</script>

<style lang="scss" scoped>
.question-block {
    margin: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
        background-image: $gradient;
        @include bcg-for-text();
        font-size: 1.5rem;
        text-align: start;
        display: inline;
    }

    img {
        border-radius: 100%;
        width: 100px;
        height: 100px;
    }
}
ul {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 15px;
    margin: 1rem 1rem;
}
</style>