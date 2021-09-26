<template>
    <div class="user-block user-tests">
        <div class="user-block-head user-tests-head">
            <h2>Мои тесты</h2>
            <img v-if="!isTestsExpanded" src="../assets/back.svg" alt="expand_button" width="30" @click="isTestsExpanded=!isTestsExpanded">
            <img v-else src="../assets/cancel.svg" alt="close_button" width="30" @click="isTestsExpanded=!isTestsExpanded">
        </div>
        <div class='user-tests-collection' v-if="isTestsExpanded">
            <Banner
            v-for="(banner, i) in banners"
            :key="i"
            :bannerInfo='banner'
            />
        </div>
    </div>
    <div class="user-block">

        <div class="user-block-head user-settings-head">
            <h2>Мои настройки</h2>
            <img v-if="!isSettingsExpanded" src="../assets/back.svg" alt="expand_button" width="30" @click="isSettingsExpanded=!isSettingsExpanded">
            <img v-else src="../assets/cancel.svg" alt="close_button" width="30" @click="isSettingsExpanded=!isSettingsExpanded">
        </div>
        <Settings v-if="isSettingsExpanded"/>

    </div>

</template>

<script setup>
    import { useStore } from "vuex";
    import { ref } from "vue";
    import Banner from '../components/TestBanner.vue'
    import Settings from '../components/Settings.vue'
    const store = useStore()
    const banners = store.state.global.banners
    const isTestsExpanded = ref(true)
    const isSettingsExpanded = ref(false)
</script>

<style lang='scss'>
    .user-block {
            box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
            border-radius: 25px;
            padding: 1rem;
            .user-block-head{
                display: flex;
                justify-content: space-between;
                margin: 0 1rem;
                img {
                    transform: rotate(270deg);
                    cursor: pointer;
                }
            }
    }
    .user-tests{
        .user-tests-collection {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(auto, 250px));
            grid-gap: 1rem;
            justify-content: center;

            .test-banner {
                box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
                border-radius: 25px;
                justify-items: center;
                padding: .5rem 1rem;

                h2{
                    text-align: center;
                }
            }
        }

    }
</style>