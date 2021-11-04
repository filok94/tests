<template >
    <div class="activated-window">
        <transition name="tests">
            <div class="tests-collection" v-if="activeTabIndex==0">
                <Banner v-for="(banner, i) in banners" :key="i" :bannerInfo="banner" />
            </div>
        </transition>
        <transition name="settings">
            <div class="settings-collection" v-if="activeTabIndex==1">
                <Settings />
            </div>
        </transition>
    </div>
    <navigation-circle :tabs="tabs" @activation="activeTarget"></navigation-circle>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, onMounted, reactive, computed } from "vue";
import Banner from '../components/TestBanner.vue'
import navigationCircle from "../components/navigationCircle.vue";
import Settings from '../components/Settings.vue'
const store = useStore()
const banners = store.state.global.banners
const activeTabIndex = ref(0)
const activeTarget = (target) => {
    activeTabIndex.value = target
}
const tabs = reactive([
    {
        name: 'Game',
        target: '',
    }, {
        name: 'Settings',
        target: '',
    },{
        name: 'Settings',
        target: '',
    }
])
onMounted(() => {
})
</script>

<style lang='scss' scoped>
.tab-selector-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    .tab-selector {
        @include card-bcg();
        padding: 1rem 2rem;
        margin: 1rem;
        border-radius: 25px;
        box-shadow: $card-shadow;
        text-align: start;
        cursor: pointer;
    }
    .activated-window {
        @include card-bcg();
        padding: 3rem;
        margin: 1rem;
    }
}
.user-block {
    box-shadow: $card-shadow;
    border-radius: 25px;
    padding: 1rem;
    margin: 1rem;
    @include card-bcg();

    .user-block-head {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 1rem;
        img {
            transition: 0.3s ease-in-out;
        }
        .img-left {
            transform: rotate(90deg);
            transition: 0.3s ease-in-out;
        }
    }
}
.user-tests {
    .user-tests-collection {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(auto, 250px));
        grid-gap: 1rem;
        justify-content: center;
    }
}
</style>