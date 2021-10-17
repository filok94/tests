<template>
    <div class="setting-type" id="avatar" @click="chooseAvatar">
        <img
            src="https://avatars.dicebear.com/api/croodles/:m2n.svg?beardProbability=99"
            alt
            width="40"
        />
        <p>Выбрать аватар</p>
    </div>
    <div class="setting-type" id="night-mode" @click="changeMode">
        <img src="../assets/dark-mode.svg" alt width="40" :class="{ 'is-dark': darkMode }" />
        <p>Переключить на {{ mode }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mode = ref('ночной')
const darkMode = ref(true)
const chooseAvatar = () => {
    router.push({ name: 'Avatar' })
}
const changeMode = () => {
    darkMode.value = !darkMode.value
    if (mode.value == 'дневной') {
        mode.value = 'ночной'
    } else mode.value = 'дневной'
}
</script>

<style lang="scss">
.setting-type {
    display: flex;
    justify-content: start;
    gap: 1rem;
    align-items: center;
    margin: 0 1rem;
    cursor: pointer;
    transition: .3s ease-in-out;
    &:hover {
        transform: scale(105%);
    }

    img {
        border-radius: 45%;
        transition: 0.3s ease-in-out;
    }
}
.is-dark {
    transform: rotate(180deg);
}
</style>