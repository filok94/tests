<template>
    <div class="conclusion-wrapper">
        <div id="conclusion-card">
            <h2>Вы {{resultPerson.title}} </h2>
            <img :src="resultPerson.img" alt="" width="150">
            <p>{{resultPerson.description}}</p>
            <p>Вы набрали {{finalUserRating}} из {{store.state.sjw.questionBlock.length}}</p>
        </div>
        <div id="conclusion-answers-container">
            <div class="conclusion-answers-card"
            v-for="(question, i) of allQuestionsTitles"
            :key="i">
                <h2>Вопрос {{i+1}}: {{question.question}}</h2>
                <p>Правильный ответ: {{question.answers[question.rightAnswer]}}</p>
            </div>
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

    let childrenOfAnwersContainer = document.querySelector('#conclusion-answers-container').children
    for (let i=0;i<childrenOfAnwersContainer.length; i++){
        if (rightAnswersindexes.includes(i)){
            childrenOfAnwersContainer[i].classList.add('questions-with-right-answers')
        } else childrenOfAnwersContainer[i].classList.add('questions-with-wrong-answers')
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
    #conclusion-card {
        margin: .1rem 1rem;
        border-radius: 15px;
        box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
        padding: 0.5rem;
        img {
            border-radius: 15px;
        }
    }
    #conclusion-answers-container {
        display: grid;
        grid-gap: 1rem;
        margin: .5rem 1rem;
        box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
        border-radius: 15px;
        padding: 0.5em;
        .conclusion-answers-card {
            border-bottom: white solid 1px;
                h2 {
                    text-align: start;
                    font-size: 1.3rem;
                }
                p {
                    text-align: start;
                    font-size: .8rem;
                }
            
            }
    }
</style>