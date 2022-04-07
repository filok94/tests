<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useTriggerStore } from "../stores/trigger";
import { onClickOutside } from '@vueuse/core'
import { Appearances, useCardGoingAside, useShakingElement, GoingAsideType } from "../Helpers/Animations";

let emit = defineEmits(['closeTriggerModal'])
let triggerStore = useTriggerStore()

onMounted(() => Appearances.fromBottom(400, triggerModal.value))

let warrior = computed(() => triggerStore.activeTriggerCardIs)

let currentQuestion = ref(0)
let triggerQuestions = computed(() => triggerStore.triggerQuestions)
let triggerQuestionsLength = computed(() => triggerQuestions.value.length ? triggerQuestions.value.length : 0)

//выбор emoji
let card = ref(null)
let chooseEmoji = (emojiAnswer: number) => {
    if (!sureToLeaveIsShown.value) {
        triggerStore.permanentAnswers.push(warrior.value.answers[currentQuestion.value] == emojiAnswer)
        let duration = 100
        emojiAnswer ? useCardGoingAside(GoingAsideType.right, duration, card.value) : useCardGoingAside(GoingAsideType.left, duration, card.value)
        setTimeout(() => { currentQuestion.value++ }, duration)
    }
}
let arrowEvent = (e: KeyboardEvent) => {
    if (e.code == "ArrowLeft") {
        chooseEmoji(0)
    } else if (e.code == "ArrowRight") {
        chooseEmoji(1)
    }
}
let enterEvent = (e: KeyboardEvent) => {
    if (e.code == "Enter") {
        closingModal(false, true)
    }
}
onMounted(() => {
    document.addEventListener('keydown', arrowEvent)
    Appearances.fromBottom(300, triggerModal.value)
})

//управление кнопками и дестрой ивентлиснеров
watch(
    currentQuestion, () => {
        if (currentQuestion.value == triggerQuestionsLength.value) {
            document.removeEventListener('keydown', arrowEvent)
            document.addEventListener('keydown', enterEvent)
        }
    }
)
onUnmounted(() => {
    document.removeEventListener('keydown', arrowEvent)
    document.removeEventListener('keydown', enterEvent)
})

//анимация завершения
let endingButton = ref(null)
let buttonEntering = () => useShakingElement(endingButton.value)

//управление показом модального окна
let triggerModal = ref(null)
onClickOutside(triggerModal, (event) => {
    setTimeout(() => { closingModal(true, false) }, 100)
})

//управление модалкой "уверены, что хотите выйти"
let sureToLeaveIsShown = ref(false)
let sureToLeave = ref(null)

let destroySureToLeave = () => {
    setTimeout(() => { sureToLeaveIsShown.value = false }, 100)
}
onClickOutside(sureToLeave, () => destroySureToLeave())

//закрытие модалки
let closingModal = (withPopup: boolean, isTestEnded: boolean) => {
    if (withPopup) {
        sureToLeaveIsShown.value = true
    } else {
        triggerStore.computeAnswers(isTestEnded ? warrior.value.id : null)
        emit('closeTriggerModal')
    }
}

</script>

<template>
    <div
        class="trigger-modal"
        @wheel.prevent
        @touchmove.prevent
        @scroll.prevent
        ref="triggerModal"
        :class="{ 'trigger-modal-opacity': sureToLeaveIsShown }"
    >
        <div id="trigger-modal-swiper"></div>
        <button class="closing-modal-button" @click.prevent="closingModal(true, false)">X</button>
        <div class="warrior-card">
            <div>
                <p class="trigger-label">
                    Текущий
                    <br />триггер
                </p>
                <p
                    class="trigger-count"
                >{{ currentQuestion + 1 > triggerQuestionsLength ? triggerQuestionsLength : currentQuestion + 1 }}</p>
            </div>

            <img :src="warrior.imageUrl" />
            <div>
                <p class="trigger-label">Из</p>
                <p class="trigger-count">{{ triggerQuestionsLength }}</p>
            </div>
        </div>
        <transition mode="out-in" @enter="buttonEntering">
            <div
                class="trigger-game-block"
                ref="card"
                v-if="currentQuestion < triggerQuestionsLength"
            >
                <div class="trigger-question">
                    <h3>{{ triggerQuestions[currentQuestion] }}</h3>
                </div>
                <div class="trigger-reacts-container">
                    <div
                        class="react react-left"
                        @click.prevent="chooseEmoji(0)"
                        ref="leftEmoji"
                    >&#128525;</div>

                    <div
                        class="react react-right"
                        @click.prevent="chooseEmoji(1)"
                        ref="rightEmoji"
                    >&#128548;</div>
                </div>
            </div>
            <button
                v-else
                class="trigger-end-button"
                ref="endingButton"
                @click.prevent="closingModal(false, true)"
            >Завершить</button>
        </transition>
    </div>
    <div class="sure-to-leave-background">
        <div class="sure-to-leave" v-if="sureToLeaveIsShown" ref="sureToLeave">
            <h4>Вы уверены, что хотите выйти?</h4>
            <p>Результат не сохранится</p>
            <div id="stl-buttons">
                <button id="stl-buttons-yes" @click.prevent="closingModal(false, false)">Да</button>
                <button id="stl-buttons-no" @click.prevent="destroySureToLeave">Нет</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
//dynamic-classes
//static-classes
.trigger-modal {
    position: fixed;
    bottom: 0 !important;
    right: 0;
    left: -0.5rem;

    height: 70vh;
    width: 100%;
    padding: 0.5rem 0.5rem 3rem 0.5rem;
    border-radius: $border-prime 25px 0px 0px;

    background: hsl(240, 7%, 18%);
    z-index: 3;

    #trigger-modal-swiper {
        height: 0.3rem;
        width: 1rem;
        background: $color-grey;
        border-radius: $border-prime;
        margin: 0 auto;
    }
    .closing-modal-button {
        background: transparent;
        border: none;

        width: 3rem;

        font-size: 2rem;
        font-family: $font;
        color: $color-grey;

        position: relative;
        right: -40%;
        &:active {
            opacity: 0.8;
        }
        cursor: pointer;
    }
    &-opacity {
        filter: blur(3px);
    }
}
.sure-to-leave {
    position: absolute;
    top: 40%;
    left: 0;
    right: 0;
    max-width: 70%;
    margin: 0 auto;
    z-index: 4;

    background: rgb(77, 77, 82);
    box-shadow: $shadow-black;
    border-radius: $border-prime;
    padding: 1rem;

    h4 {
        margin: 0.8rem 0;
    }
    p {
        color: $color-grey;
        font-size: 0.8rem;
        margin: 0.8rem;
    }
    #stl-buttons {
        display: flex;
        justify-content: space-evenly;
        button {
            border: none;
            box-shadow: $shadow-black;
            border-radius: $border-prime;
            color: $color-grey;
            font-family: $font;
            padding: 0.6rem;
            width: 3rem;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            &:hover {
                transform: scale(104%);
            }
        }
        &-no {
            background: $gradient;
        }
        &-yes {
            background: $color-grey;
        }
    }
}

.warrior-card {
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.19) !important;

    margin: 1rem 0;
    @include blur-bcg();
    background: hsla(240, 1%, 16%, 0.521);

    padding: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;

    img {
        width: 5rem;
    }
    div {
        flex-basis: min-content;
        .trigger-count {
            background: $gradient;
            @include bcg-for-text();
            font-size: 3rem;
            margin: 0;
        }
        .trigger-label {
            color: $color-grey;
            font-size: 1rem;
            margin: 0;
        }
    }
}
.trigger-game-block {
    padding: 1rem;

    .trigger-reacts-container {
        display: flex;
        justify-content: center;
        .react {
            font-size: 4rem;
            padding: 1rem;
            background: hsla(240, 1%, 16%, 0.521);
            width: 45%;
            cursor: pointer;
            &:active {
                box-shadow: 0 0px 0px rgba(0, 0, 0, 0) !important;
            }
            &-left {
                box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.19);
                border-radius: $border-prime 0px 0px 25px;
                // background: $color-violet;
            }
            &-right {
                box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.19);
                border-radius: 0px 25px 25px 0px;
                // background: $color-pink;
            }
        }
    }
}
.trigger-end-button {
    @include primary-button();
}
@media (min-width: $medium-screen) {
    .trigger-modal {
        width: 80%;
        bottom: 4rem !important;
        border-radius: $border-prime;
        left: 0;
        right: 0;
        margin: 0 auto;
        padding: 2rem;
    }
    .warrior-card {
        width: 60%;
        margin: 1rem auto;
    }
    .sure-to-leave {
        width: fit-content;
        padding: 1.5rem;
        h4 {
            font-size: 1.6rem !important;
        }
        p {
            font-size: 1.3rem;
        }
        #stl-buttons-yes,
        #stl-buttons-no {
            font-size: 1.8rem;
            padding: 1rem;
            width: 6rem !important;
        }
    }
}
@media (min-width: $large-screen) {
    .trigger-modal {
        width: 50%;
    }
    h3 {
        font-size: 1.7rem;
    }
}
</style>