<template>
    <div class='test-banners-container'>
        <Banner
        v-for="(banner, i) in banners"
        :key="i"
        :bannerInfo='banner'
        />
    </div>
</template>

<script setup>
    import { useStore } from "vuex";
    import Banner from '../components/TestBanner.vue'
    const store = useStore()
    const banners = store.state.global.banners

</script>

<style lang='scss'>
    .test-banners-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(auto, 250px));
        grid-gap: 1rem;
        .test-banner {
            box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        }
    }
</style>