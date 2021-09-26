<template>
    <div class="conclusion-wrapper">
        <div id="conclusion-card">
            <h2>Вы {{resultPerson.title}} </h2>
            <img :src="resultPerson.img" alt="" width="150">
            <p>{{resultPerson.description}}</p>
            <p>Вы набрали {{finalUserRating}} из {{store.state.sjw.questionBlock.length}}</p>
        </div>
        <div class="conclusion-results-container">
            <p
            v-for="(question, i) of allQuestionsTitles"
            :key="i"
            >
            {{question.question}}

            </p>
        </div>
    </div>
</template>

<script setup>
import {useStore} from 'vuex'
import {computed, ref, onMounted} from 'vue'
const store = useStore()

const finalUserRating = computed(()=>{
    let userRating = store.state.sjw.rightAnswers.filter(trueValues => trueValues==true).length
    return userRating
})

const resultPerson = computed(()=>{
    let person = store.state.sjw.resultPersons[finalUserRating.value]
    return person
})

const allQuestionsTitles = computed(()=>{
    let allQuestions = store.state.sjw.questionBlock
    return allQuestions
})

onMounted(()=>{
    // найти индексы всех правильных ответов, и применить класс с зеленым текстом только для этих индексов
    let rightAnswersindexes = []
    let allQuestions = store.state.sjw.rightAnswers
    allQuestions.forEach((e,index) => {
        if (e){
            rightAnswersindexes.push((index))
        }
    })

    let parent = document.querySelector('.conclusion-results-container').children
    for (let i=0;i<parent.length; i++){
        if (rightAnswersindexes.includes(i)){
            parent[i].classList.add('questions-with-right-answers')
        } else parent[i].classList.add('questions-with-wrong-answers')
    }
})
</script>

<style lang="scss" scoped>
@import '../assets/vars.scss';
    .questions-with-wrong-answers {
        @include bcg-for-text();
        background-image: $bad-gradient;
    }
    .questions-with-right-answers {
        @include bcg-for-text();
        background-image: $right-gradient;
    }
</style>