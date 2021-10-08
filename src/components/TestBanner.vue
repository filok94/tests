<template>
    <div class="test-banner" @click="goToTest">
        <h2>{{ bannerInfo.title }}</h2>

        <h3>{{ bannerInfo.subtitle }}</h3>
        <p>Ваш результат</p>
        <img :src="bannerInfo.img" alt />
    </div>
</template>

<script setup>
//С родительского компонента берем данные для баннера теста
import { defineProps } from 'vue'
const props = defineProps({
    bannerInfo: Object
})


//Переход к нужному тесту. Используем имя роута из глобал стора, динамической роут задаем единицей
import { useRouter } from 'vue-router'
const router = useRouter()
const goToTest = () => router.push({ name: props.bannerInfo.route, params: { questionNumber: 1 } })

</script>

<style lang="scss">
@import "../assets/vars.scss";

.test-banner {
    background-color: $bcg-second;
}
</style>