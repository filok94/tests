<template>
    <div>
        <h1>Приветствую, как к тебе обращаться?</h1>
        <input type="text" v-model='user'>
        <br>
        <button :disabled="!user" @click='submitName'>Подтвердить</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const user = ref('')


//берем имя, введеное пользователем и передаем его в глобал стор и в динамический роут
import { useRouter } from 'vue-router';
const router = useRouter()

import { useStore } from 'vuex';
const store = useStore()

const submitName = ()=> {
    store.commit('submitUserName', user.value)
    router.push({name:'User', params: {userName: user.value}})
}
</script>