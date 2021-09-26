<template>
    <li v-if="checkIsActive" @click="checkAnswer" class="active">
        {{thisAnswer}}
    </li>
    <li v-else class="nonActive" :class="classObject">
        {{thisAnswer}}
    </li>
</template>
<script setup>
    import { computed, defineProps, reactive, watch } from 'vue'
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
        if (props.currentBlock.rightAnswer === props.thisNumber){
            store.commit('СHOOSE_QUESTION', true)
            classObject.right = true
        
        } else {
            store.commit('СHOOSE_QUESTION', false)
            classObject.error = true
        }
    }

//применяем нужный класс. Когда перешли на следующий вопрос, то данные классов стираются
    const classObject = reactive({
        right: false,
        error: false
    })
    watch(
        ()=> checkIsActive.value, (newValue, oldValue) => {
            if (newValue) {
                classObject.right = false
                classObject.error = false
            }
            
    })
</script>

<style lang="scss" scoped>
@import '../assets/vars.scss';
    li {
        list-style-type: none;
        border-radius: 15px;
        cursor: pointer;
        padding: 0.8rem;
        margin: 0;
        background-color: rgba(255,255,255,.1);
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        transition: 1s ease;
        &:active {
            transform: scale(95%);
        }
    }
    .active{
        transition: 1s ease;
        
        &:hover {
            transform: scale(101%);
        }
    }
    .right {
        background: $right-gradient;
    }
    .error {
        background: $bad-gradient;
        backdrop-filter: blur(5px);
    }
  
</style>