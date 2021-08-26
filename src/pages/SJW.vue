<template>
    <router-view>

    </router-view>
    <button v-if="!isTestEnded" @click="nextQuestion">Test</button>
    <button v-if="isTestEnded">End</button>
</template>

<script setup>
    import { computed, onMounted } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import { useStore } from "vuex";
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    //Проверяем, что пользователь пришел к последнему вопросу и меняем кнопку
    const isTestEnded = computed(()=>store.state.sjw.isTestEnded)
    
    //нажатие на кнопку передает в стор, какой блок вопросов сейчас рендерить, и пушит следующий роут в УРЛ
    const newBlock = computed(()=>Number(route.params.questionNumber))
    const nextQuestion = ()=> {
        store.commit('NEXT_QUESTION', Number(route.params.questionNumber))
        router.push({name:'QuestionNumber', params:{questionNumber:newBlock.value+1}})
    }
    //для того, чтобы к вопросу можно было перейти из УРЛ_строки, передаем нужные параметры в стор для корректного рендера компонента
    const currentNumber = store.commit('NEXT_QUESTION', Number(newBlock.value-1))
    onMounted(()=>{currentNumber})
</script>

<style lang="scss">
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 1s ease-out;
    }
</style>