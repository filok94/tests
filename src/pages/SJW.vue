<template>
    <router-view></router-view>
    <button v-if="!isTestEnded" @click="nextQuestion">Следующий вопрос</button>
    <button v-if="isTestEnded" @click="endTestButton">Закончить тест</button>
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

    const endTestButton = ()=>{
        router.push({name:'Conclusion'})
    }
</script>

<style lang="scss" scoped>
@import '../assets/vars.scss';
button {
    cursor: pointer;
    background: $gradient;
    border: none;
    border-radius: 15px;
    padding: 1rem;
    font-size: 1rem;
    font-family: $font;
    transition: .5s ease-out;
    &:hover {
        transform: scale(104%);
        color: white;
    }
    &:active {
        transform: scale(100%);
    }
}
</style>