<template>
    <div class="home-navigation">
        <div @click="nameOfActiveWindow = 'auth'" :class="{ active: nameOfActiveWindow=='auth' }">Авторизация</div>
        <div @click="nameOfActiveWindow = 'reg'" :class="{ active: nameOfActiveWindow=='reg' }">Регистрация</div>
    </div>
    <transition :name="nameOfActiveWindow" mode="out-in">
        <Auth v-if="nameOfActiveWindow=='auth'"></Auth>
        <Reg v-else></Reg>
    </transition>
</template>

<script setup>
import Auth from '../components/AuthWindow.vue'
import Reg from '../components/RegWindow.vue'
import { ref, onUnmounted, onMounted } from 'vue'

//watch on which window is active and change the animation
let nameOfActiveWindow = ref('auth')

// key_arrows directions
let arrowDirections = (e) => {
    if (e.code == "ArrowLeft") {
        nameOfActiveWindow.value = 'auth'
    } else if (e.code == "ArrowRight") {
        nameOfActiveWindow.value = 'reg'
    }
}
onMounted(() => {
    document.addEventListener('keydown', arrowDirections, false)

})
onUnmounted(() => {
    document.removeEventListener('keydown', arrowDirections, false)
})
</script>

<style lang="scss" scoped>
@import "../assets/vars.scss";
.home-navigation {
    border-radius: 25px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    display: inline-flex;
    justify-content: center;

    flex-wrap: wrap;
    font-size: 2rem;
    margin: 0 1rem;
    div {
        border-radius: 25px;
        max-width: 100%;
        padding: 1rem;
        width: 100%;
        cursor: default;
        @include card-bcg();
    }
    .active {
        background: $gradient;
    }
}

@media (min-width: $medium-screen) {
    .home-navigation {
        flex-wrap: nowrap;
    }
}

.auth-enter-active,
.auth-leave-active,
.reg-enter-active,
.reg-leave-active {
    transition: all 0.3s ease;
}
.auth-enter-from,
.reg-leave-to {
    opacity: 0;
    transform: translate(300px, -10px);
}
.auth-leave-to,
.reg-enter-from {
    opacity: 0;
    transform: translate(-300px, -10px);
}
.auth-enter-to,
.auth-leave-from,
.reg-enter-to,
.reg-leave-from {
    opacity: 1;
    transform: translateX(0, 0);
}
</style>