<template>
    <div class="conclusion-container-visible">
        <transition>
            <div class="trigger-conclusion-container" ref="conclusionCardRef" v-if="finalPerson">
                <img class="trigger-conclusion-image" :src="finalPerson.image" alt="image of fem" />
                <h1 class="trigger-conclusion-title">
                    <a :href="finalPerson.link">{{ finalPerson.title }}</a>
                </h1>
                <h2 class="trigger-conclusion-description">{{ finalPerson.description }}</h2>
                <button
                    @click.prevent="goBackToMainMenu"
                    class="trigger-conclusion-button"
                >Вернуться на главную</button>
            </div>
            <Loading v-else />
        </transition>
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { onClickOutside } from '@vueuse/core'
import { useAppearenceFromBottom } from '../components/Animations.js'
import Loading from '../components/Loading.vue'

let router = useRouter()
let store = useStore()

const conclusionCardRef = ref(null)
onClickOutside(conclusionCardRef, (e) => false)

let finalPerson = computed(() => {
    let result = 0
    store.state.trigger.triggerAnswersResults.forEach(e => result += e)
    let level = 0
    if (result > 8 && result < 13) {
        level = 1
    } else if (result >= 13) {
        level = 2
    }
    let computedResult = null
    store.state.trigger.triggerConclusionPersons.forEach((e) => {
        e.level === level ? computedResult = e : null
    })
    store.commit("SET_PERSON", computedResult)
    return computedResult
})

let wasTestEnded = computed(() => store.state.trigger.wasTestEnded)
let goBackToMainMenu = () => {
    if (!wasTestEnded.value) {
        store.dispatch("postResults")
    }
    router.push({ name: 'User', params: { userName: window.localStorage.getItem("isAuthedBy") } })
}
let enterEventListener = (e) => {
    if (e.code == "Enter") {
        goBackToMainMenu()
    }
}
onMounted(() => {
    store.dispatch("getTriggerConclusion")
    document.addEventListener('keydown', enterEventListener)
    useAppearenceFromBottom(conclusionCardRef.value, 300)
})
onUnmounted(() => {
    document.removeEventListener('keydown', enterEventListener)
})
</script>

<style scoped lang="scss">
.trigger-conclusion-container {
    position: absolute;
    top: 20%;
    margin: 0 1rem;
    left: 0;
    right: 0;

    @include card-bcg;
    padding: 2rem;
    z-index: 3;
    img {
        width: 15rem;
        border-radius: 15px;
    }
    h1 {
        font-size: 3rem;
        background: $gradient;
        @include bcg-for-text;
        cursor: pointer;
        line-height: 2.9rem;
        margin: 0.8rem;
        &:hover {
            text-decoration: underline;
            text-decoration-color: $second-color;
            text-decoration-thickness: 0.1rem;
        }
    }

    h2 {
        font-size: 0.9rem;
        margin: 0;
        color: $grey-color;
    }
    button {
        @include primary-button();
        font-size: 1.3rem;
        margin: 1rem;
    }
}
@media (min-width: $large-screen) {
    .trigger-conclusion-container {
        width: 60%;
        margin: 0 auto;
    }
}
</style>