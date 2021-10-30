<template>
    <div class="conclusion-wrapper">
        <div id="conclusion-card">
            <img :src="userRatingInfoHelper.person.img" alt width="150" />
            <h2>Вы {{ userRatingInfoHelper.person.title }}</h2>
            <p>{{ userRatingInfoHelper.person.description }}</p>
            <p>Ваш результат: {{ userRatingInfoHelper.userRating }} из {{ storePrefix.questionBlock.length }}</p>
        </div>
        <ul id="conclusion-dots-container">
            <li
                class="conclusion-dots"
                v-for="(question,i) in userRatingInfoHelper.questions"
                :key="i"
                @click="activateQuestionFromList(i)"
            ></li>
        </ul>

        <div class="conclusion-answer-card">
            <h2 class="conclusion-answer-card-head">{{ selectedQuestion.question }}</h2>
            <p>
                <span>Правильный ответ:</span>
                {{ selectedQuestion.rightAnswer }}
            </p>
            <p>Ваш ответ: {{ selectedQuestion.yourAnswer }}</p>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, reactive, onMounted, watch } from 'vue'
const store = useStore()
const storePrefix = store.state.sjw

const userRatingInfoHelper = computed(() => {
    let userInfo = {
        userRating: null,
        person: null,
        questions: null,
    }
    userInfo.userRating = storePrefix.userAnswers.filter(trueValues => trueValues == true).length
    userInfo.person = storePrefix.resultPersons[userInfo.userRating]
    userInfo.questions = storePrefix.questionBlock
    return userInfo
})
const selectedQuestion = reactive({
    question: "",
    rightAnswer: "",
    yourAnswer: ""
})
const activateQuestionFromList = (count) => {
    let listOfDots = Array.from(document.querySelector('#conclusion-dots-container').children)
    listOfDots.forEach((e, index) => {
        e.classList.remove('conclusion-chosen-dot')
        if (index == count) {
            e.classList.add('conclusion-chosen-dot')
            selectedQuestion.question = storePrefix.questionBlock[index].question
            selectedQuestion.rightAnswer = storePrefix.questionBlock[index].answers[storePrefix.questionBlock[index].rightAnswer]
            selectedQuestion.yourAnswer = storePrefix.questionBlock[index].answers[storePrefix.userAnswers[index][1]]
        }
    })
}
onMounted(() => {
    // найти индексы всех правильных ответов, и применить класс с зеленым текстом только для этих индексов
    let rightAnswersIndexes = []
    let userAnswers = storePrefix.userAnswers
    userAnswers.forEach((e, index) => {
        if (e[0]) {
            rightAnswersIndexes.push((index))
        }
    })

    let childrenOfAnwersContainer = Array.from(document.querySelector('#conclusion-dots-container').children)
    childrenOfAnwersContainer.forEach((e, index) => {
        if (rightAnswersIndexes.includes(index)) {
            e.classList.add('conclusion-dots-right')
        } else e.classList.add('conclusion-dots-wrong')
    })
    selectedQuestion.question = storePrefix.questionBlock[0].question
    selectedQuestion.rightAnswer = storePrefix.questionBlock[0].answers[storePrefix.questionBlock[0].rightAnswer]
    selectedQuestion.yourAnswer = storePrefix.questionBlock[0].answers[storePrefix.userAnswers[0][1]]
    document.querySelector('#conclusion-dots-container').children[0].classList.add('conclusion-chosen-dot')
})

watch(
    () => selectedQuestion.question, (newValue, oldValue) => {
        let animatedElement = document.querySelector('.conclusion-answer-card')
        if (newValue != oldValue) {
            animatedElement.classList.add('animated-element')
            setTimeout(() => {
                animatedElement.classList.remove('animated-element')
            }, 300)
        }
    })
</script>

<style lang="scss" scoped>
#conclusion-card {
    margin: 3rem 1rem;
    border-radius: 15px;
    box-shadow: $card-shadow;
    padding: 1rem;
    img {
        border-radius: 100px;
        margin: -3rem 0 0.5rem 0;
    }
    p {
        color: lightgray;
    }
    @include card-bcg();
}
#conclusion-dots-container {
    display: flex;
    justify-content: space-between;
    max-width: 80%;
    margin: 0 auto;
    padding: 0;
    .conclusion-dots {
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        list-style-type: none;
        transition: 0.3s ease-in-out;
        cursor: pointer;
    }
    .conclusion-dots-right {
        background-image: $right-gradient;
    }
    .conclusion-dots-wrong {
        background-image: $bad-gradient;
    }
    .conclusion-chosen-dot {
        transform: scale(180%);
    }
}

.conclusion-answer-card {
    @include card-bcg();
    border-radius: 15px;
    padding: 1rem;
    margin: 1rem;
    h2 {
        text-align: start;
        font-size: 1.5rem;
    }
    p {
        text-align: start;
        font-size: 1rem;
        span {
            font-weight: bold;
        }
    }
}
.animated-element {
    animation: 0.3s card-animation ease-in-out;
}
@keyframes card-animation {
    from {
        opacity: 0;
        transform: translateX(-3rem);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@media (min-width: $large-screen) {
    #conclusion-dots-container {
        width: 50%;
    }
}
</style>