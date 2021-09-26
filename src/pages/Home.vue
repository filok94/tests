<template>
    <div class="home-navigation">
        <div @click="activeWindow=true" :class="{active:activeWindow}">Авторизация</div>
        <div  @click="activeWindow=false" :class="{active:!activeWindow}">Регистрация</div>
    </div>
    <Auth v-if="activeWindow"></Auth>
    <Reg v-else></Reg>
</template>

<script setup>
import Auth from '../components/AuthWindow.vue'
import Reg from '../components/RegWindow.vue'
import { ref } from 'vue'
const activeWindow = ref(true)
</script>

<style lang="scss">
@import '../assets/vars.scss';
.home-navigation {
    border-radius: 25px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
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
    }
    .active {
        background: $prim-color;
    }
}

@media (min-width: $medium-screen) {
    .home-navigation {
    flex-wrap: nowrap;
    }
}
</style>