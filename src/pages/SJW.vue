<template>
    <router-view></router-view>
    <button
        @click.prevent="nextQuestion(route.params.step)"
        v-show="!isButtonDisabled"
        ref="button"
    >{{ buttonName }}</button>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";
import gsap from "gsap";
const store = useStore()
const router = useRouter()
const route = useRoute()

//нажатие на кнопку передает в стор, какой блок вопросов сейчас рендерить, и пушит следующий роут в УРЛ
const isButtonDisabled = computed(() => {
    return store.state.sjw.userAnswers.length < route.params.step ? true : false
})
let button = ref(null)

const buttonName = ref('Next')
const nextQuestion = (i) => {
    if (route.params.step < store.state.sjw.questions.length) {
        router.push({ name: 'sjw-question', params: { step: Number(i) + 1 } })
    } else {
        router.push({ name: 'Conclusion' })
    }
}
onBeforeRouteUpdate(
    (to, from) => {
        if (Number(to.params.step) == 8) {
            buttonName.value = 'End'
        }
    }
)
watch(
    isButtonDisabled, () => {
        gsap.from(button.value, { x: -100, opacity: 0 })
    }
)
//для того, чтобы к вопросу можно было перейти из УРЛ_строки, передаем нужные параметры в стор для корректного рендера компонента

onMounted(() => {
})
</script>
<style lang="scss" scoped>
button {
    cursor: pointer;
    background: $prim-color;
    border: none;
    border-radius: 15px;
    padding: 1rem;
    font-size: 1rem;
    font-family: $font;
    transition: 0.3s ease-out;
    color: $grey-color;
    max-width: 25rem;
    width: 50%;
    &:hover {
        transform: scale(104%);
    }
    &:disabled {
        background: $grey-color;
    }
}
</style>