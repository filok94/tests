<template>
    <div class="games-collection">
        <div v-for="(game, i) in games" :key="i" class="game-banner" @click="goToTest">
            <h2>{{ game.title }}</h2>
            <h3>{{ game.subtitle }}</h3>
            <p>Ваш результат: {{}}</p>
            <img :src="game.img" alt />
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
const router = useRouter()
const goToTest = () => router.push({ name: props.bannerInfo.route, params: { questionNumber: 1 } })

const store = useStore()
const games = computed(()=> store.state.global.games)
</script>

<style lang="scss" scoped>
.games-collection {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 440px));
    grid-gap: 1rem;
    .game-banner {
        @include card-bcg();
        box-shadow: $card-shadow;
        justify-items: center;
        padding: 0.5rem 1.5rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        text-align: start;
        h3,
        p {
            color: $grey-color;
        }
        &:hover {
            transform: scale(102%);
            h2 {
                background: $gradient;
                @include bcg-for-text();
            }
        }
    }
}
</style>