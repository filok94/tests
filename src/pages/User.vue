<template >
    <Loader v-if="isLoading" />
    <div
        class="user-block user-tests"
        :class="{ 'user-tests-full': isTestsExpanded, 'user-tests-low': !isTestsExpanded }"
    >
        <div class="user-block-head user-tests-head" @click.prevent="growBlock('tests')">
            <h2>Мои тесты</h2>
            <img
                :class="{ 'img-left': isTestsExpanded }"
                src="../assets/back.png"
                alt="expand_button"
            />
        </div>
        <transition name="tests">
            <div class="user-tests-collection" v-show="isTestsExpanded">
                <Banner v-for="(banner, i) in banners" :key="i" :bannerInfo="banner" />
            </div>
        </transition>
    </div>
    <div
        class="user-block"
        :class="{ 'user-settings-full': isSettingsExpanded, 'user-settings-low': !isSettingsExpanded }"
    >
        <div class="user-block-head user-settings-head" @click="growBlock('settings')">
            <h2>Мои настройки</h2>
            <img
                :class="{ 'img-left': isSettingsExpanded }"
                src="../assets/back.png"
                alt="expand_button"
            />
        </div>
        <transition name="settings">
            <div v-if="isSettingsExpanded" class="user-settings-collection">
                <Settings />
            </div>
        </transition>
    </div>
</template>

<script setup>

import { useStore } from "vuex";
import { ref, reactive, onMounted } from "vue";
import Banner from '../components/TestBanner.vue'
import Settings from '../components/Settings.vue'
import Loader from '../components/Loader.vue'

const store = useStore()
const banners = store.state.global.banners

const isLoading = ref(true)
const isTestsExpanded = ref(false)
const isSettingsExpanded = ref(false)
let blocksSizes = reactive({
    testLargeSize: '',
    testSmallSize: '',
    settingsLargeSize: '',
    settingsSmallSize: ''
})
const growBlock = (block) => {
    switch (block) {
        case 'settings':
            isSettingsExpanded.value = !isSettingsExpanded.value;
            break;
        case 'tests':
            isTestsExpanded.value = !isTestsExpanded.value;
            break;
    }
}

onMounted(() => {
    blocksSizes.settingsSmallSize = blocksSizes.testSmallSize = `${document.querySelector(".user-block").clientHeight - 32}px`
    setTimeout(() => {
        isTestsExpanded.value = !isTestsExpanded.value
        isSettingsExpanded.value = !isSettingsExpanded.value
    }, .1)
    setTimeout(() => {
        blocksSizes.testLargeSize = `${document.querySelector(".user-tests-full").clientHeight - 32}px`
        blocksSizes.settingsLargeSize = `${document.querySelector(".user-settings-full").clientHeight - 32}px`
        isTestsExpanded.value = !isTestsExpanded.value
        isSettingsExpanded.value = !isSettingsExpanded.value

    }, .2)
    setTimeout(() => {
        isLoading.value = !isLoading.value
    }, 1000)

})
</script>

<style lang='scss' scoped>
.user-block {
    box-shadow: $card-shadow;
    border-radius: 25px;
    padding: 1rem;
    margin: 1rem;
    @include card-bcg();
    animation: opening 2s;

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

.tests-enter-active,
.tests-leave-active,
.settings-enter-active,
.settings-leave-active {
    transition: all 0.3s ease;
}
.tests-enter-from,
.tests-leave-to,
.settings-enter-from,
.settings-leave-to {
    opacity: 0;
    transform: translate(0, -70px);
}
.tests-enter-to,
.tests-leave-from,
.settings-enter-to,
.settings-leave-from {
    opacity: 1;
    transform: translate(0, 0);
}

.user-tests-full {
    height: v-bind("blocksSizes.testLargeSize");
    transition: 0.3s ease-in-out;
}
.user-settings-full {
    height: v-bind("blocksSizes.settingsLargeSize");
    transition: 0.3s ease-in-out;
}
.user-tests-low,
.user-settings-low {
    height: v-bind("blocksSizes.testSmallSize");
    transition: 0.3s ease-in-out;
}

@keyframes opening {
    0%,20%,30%,40%,50%{
        transform: translateX(-200vw);
    }
    60%,70%,80%,90%,100% {
        transform: translateX(0);
    }
}
</style>