<template>
    <div class="question-block">
        <h1>{{currentBlock.question}}</h1>
        <img src="" alt="question-image">
    </div>
    <div class="answer-block">
        <ul>
            <Answer
            v-for="(answer, i) in currentBlock.answers"
            :key="i"
            :thisAnswer='answer'
            :thisNumber='i'
            :currentBlock='currentBlock'
            />
        </ul>
    </div>
</template>

<script setup>
    
import { ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router';
import { useStore } from "vuex";
import Answer from "../components/Answer.vue";
const store = useStore()

//сообщаем компоненту, что сейчас надо рендерить
const currentBlock = ref(store.state.sjw.questionBlock[store.state.sjw.currentBlock])

//при смене УРЛа сообщаем комопненту, что необходимо перерендерить данные
onBeforeRouteUpdate((to, from)=>{
    if (to.params.questionNumber !==from.params.questionNumber){
        currentBlock.value = store.state.sjw.questionBlock[to.params.questionNumber-1]
    }
})

</script>

<style lang="scss">
    ul {
        display: flex;
        flex-wrap: wrap;
        gap: 2em;
    }
</style>