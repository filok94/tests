<template>
    <li v-if="checkIsActive" @click="checkAnswer">
        {{thisAnswer}}
    </li>
    <li v-else class="nonActive">
        {{thisAnswer}}
    </li>
</template>
<script setup>
    import { computed, defineProps } from 'vue'
    import { useStore } from 'vuex';
    const store = useStore()
    const props = defineProps({
    thisAnswer: String,
    thisNumber: Number,
    currentBlock: Object
})
//Проверяем, что пользователь нажал на какой-то вариант ответа и дизейблим возомжность повтороного нажатия на ответы
    const checkIsActive = computed(()=>store.state.sjw.isActive)
    const checkAnswer = ()=> {
        if(props.currentBlock.rightAnswer === props.thisNumber){
            store.commit('СHOOSE_QUESTION', true)
        } else store.commit('СHOOSE_QUESTION', false)
    }
</script>

<style lang="scss">
    li {
        list-style-type: none;
        border: solid;
        border-radius: 1em;
        cursor: pointer;
    }
</style>