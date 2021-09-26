<template>
    <div class='setting-type' id="avatar">
        <p>Выбрать аватар</p>
        <img src="https://avatars.dicebear.com/api/croodles/:m2n.svg?beardProbability=99" alt="" width="40" @click="chooseAvatar">
    </div>
    <div class='setting-type' id="night-mode">
        <p>Переключить на {{mode}}</p>
        <img src="../assets/dark-mode.svg"
        alt=""
        width="40"
        :class="{'is-dark':darkMode}"
        @click="changeMode">
    </div>
</template>

<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mode = ref('ночной')
const darkMode = ref(true)
const chooseAvatar = ()=>{
    router.push({name:'Avatar'})
}
const changeMode = ()=>{
    darkMode.value = !darkMode.value
    if(mode.value == 'дневной'){
        mode.value = 'ночной'
    } else mode.value = 'дневной'
}
</script>

<style lang="scss">

.setting-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 1rem;
  
    
    img{
        cursor: pointer;
        border-radius: 45%;
        transition: 2s ease;
    }
}
.is-dark {
    transform: rotate(180deg);
}
</style>