<template>
    <div class="question-block">
        <h1>{{ shownNowQuestion.question }}</h1>
        <img :src="image" alt="question-image" width="300" />
    </div>
    <div class="answer-block">
        <ul>
            <li
                v-for="(answer, i) of shownNowQuestion.answers"
                :key="i"
                @click.prevent="chooseAnswer(i)"
                :ref="setAllAnswersRefs"
                :class="{
                    'active-answer': isActive,
                    'right': usersChoice == i && usersChoice != null && usersChoice == shownNowQuestion.rightAnswer,
                    'wrong': usersChoice == i && usersChoice != null && usersChoice != shownNowQuestion.rightAnswer
                }"
            >
                <p>{{ answer }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup>

import { computed, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useStore } from "vuex";

const route = useRoute()
const store = useStore()
//отрендеренный вопрос
const shownNowQuestion = computed(() => {
    return store.state.sjw.questions[route.params.step - 1]
})
//answers are inActive and active 
const isActive = ref(true)
const allAnswersRefs = []
const usersChoice = ref(null)
let setAllAnswersRefs = el => { if (el) allAnswersRefs.push(el) }
const chooseAnswer = (i) => {
    if (isActive.value) {
        let isAnswerTrue = null
        if (i === shownNowQuestion.value.rightAnswer) {
            isAnswerTrue = true
        } else {
            isAnswerTrue = false
        }
        store.commit('СHOOSE_QUESTION', { answer: isAnswerTrue, number: route.params.step - 1 })
        isActive.value = false
        usersChoice.value = i
    }
}
//фото для вопроса
let image = computed(() => `/${shownNowQuestion.value.image}.png`)

//delete all classes and instance value everytime
onBeforeRouteUpdate(
    (to, from) => {
        isActive.value = true;
        usersChoice.value = null;
    }
)
</script>

<style lang="scss" scoped>
.question-block {
    margin: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
        text-align: start;
    }

    img {
        border-radius: 100%;
        width: 100px;
        height: 100px;
    }
}
.answer-block {
    margin: 2rem;
    ul {
        padding: 0;
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        grid-gap: 1.5rem;
        justify-content: start;
        li {
            padding: 1rem;
            list-style-type: none;
            margin: 0;
            text-align: start;
            font-size: 1.1rem;
            color: $grey-color;
            transition: 0.3s ease-in-out;
            @include card-bcg();
        }
        p {
            margin: 0;
            padding: 0;
        }
        .right {
            transform: scale(103%);
            p {
                background: $right-gradient;
                @include bcg-for-text();
            }
        }
        .wrong {
            transform: scale(103%);
            p {
                background: $bad-gradient;
                @include bcg-for-text();
            }
        }
    }
    .active-answer {
        cursor: pointer;

        &:hover {
            transform: scale(101%);
            p {
                background: $prim-color;
                @include bcg-for-text();
            }
        }
    }
}
</style>