<template>
    <div class="nav-circle" @click.stop="activateNavCircle">
        <img src="https://avatars.dicebear.com/api/open-peeps/filya.svg" alt="navigation_circle" />
        <p>Click to navigate</p>
        <div
            v-show="isCirclesActive"
            :ref="el => { if (el) circles[i] = el }"
            @click.self.stop="button($event.target)"
            :class="{ 'active-target': activeTabIs == i }"
            v-for="(tab, i) of props.tabs"
            class="target-circle"
        >{{ tab.name }}</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
let props = defineProps({
    tabs: Array
})
let emit = defineEmits(['activation'])
let stringifiedBordersOfMainCircle = ref('76px 53px 45px 92px')
let stringifiedBordersOfActiveTarget = ref('63px 78% 92% 45%')
let changingBorders = (stringToChange) => {
    let arrayHelper = []
    for (let i = 0; i < 4; i++) {
        arrayHelper.push((Math.random() * (99 - 45) + 45).toFixed())
    }
    stringToChange.value = arrayHelper.join('% ') + '%'
}
let keyControls = (e) => {
    if (e.code == 'ArrowLeft') {
        if (activeTabIs.value == 0) {
            activeTabIs.value = props.tabs.length - 1
        } else {
            activeTabIs.value--
        }
    } else if (e.code == 'ArrowRight') {
        if (activeTabIs.value == props.tabs.length - 1) {
            activeTabIs.value = 0
        } else {
            activeTabIs.value++
        }
    }
    changingBorders(stringifiedBordersOfActiveTarget)
    emit('activation', activeTabIs.value)
}
const isCirclesActive = ref(false)
const circles = ref([])
let activateNavCircle = () => {
    
    if (!isCirclesActive.value) {
        isCirclesActive.value = true
        document.addEventListener('keydown', keyControls)
        let tl = gsap.timeline({ defaults: { duration: .1, ease: 'ease' } })
            .from(circles.value[0], { x: '5rem', opacity: 0 })
            .from(circles.value[1], { y: '10rem', opacity: 0 })
            if (circles.value.length>2){
                tl.fromTo(circles.value[2], { x: '-6rem', y: '-8rem', opacity: 0 }, { y: '-12rem', x: '-3rem', opacity: 1 })
            }
    } else {
        isCirclesActive.value = false
        document.removeEventListener('keydown', keyControls)
    }
    changingBorders(stringifiedBordersOfMainCircle)
}

const activeTabIs = ref(0)
let button = (elem) => {
    let indexOfElem = Array.from(document.querySelectorAll('.target-circle')).indexOf(elem)
    emit('activation', indexOfElem)
    activeTabIs.value = indexOfElem
    changingBorders(stringifiedBordersOfActiveTarget)
}
onMounted(() => {
    setInterval(() => changingBorders(stringifiedBordersOfMainCircle), 20000)
})
</script>
<style lang="scss" scoped>
.nav-circle {
    position: fixed;
    top: 70vh;
    right: 15vw;

    border-radius: v-bind("stringifiedBordersOfMainCircle");
    width: 7rem;
    height: 7rem;
    padding: 1rem;
    background: $prim-color;
    box-shadow: 0 10px 20px rgba(85, 39, 160, 0.486),
        0 6px 6px rgba(78, 17, 219, 0.23);
    transition: 1.5s ease-in-out;
    cursor: pointer;
    img {
        max-width: 80%;
        max-height: 80%;
    }
    p {
        font-size: 0.6rem;
        margin: 0;
        color: $grey-color;
    }

    .target-circle {
        font-size: 0.8rem;
        line-height: 4rem;
        position: relative;
        width: 4rem;
        height: 4rem;
        border-radius: 100%;
        background: $prim-color;
        color: $grey-color;
        cursor: pointer;
    }
    div:nth-of-type(1) {
        right: 6rem;
        top: -1rem;
        z-index: -1;
    }
    div:nth-of-type(2) {
        right: 6rem;
        top: -12rem;
        z-index: -2;
    }
    div:nth-of-type(3) {
        right: -1rem;
        top: -9rem;
        z-index: -3;
    }
}
.active-target {
    background: $second-color !important;
    transform: scale(130%);
    transition: 0.3s ease-in-out;
    border-radius: v-bind("stringifiedBordersOfActiveTarget") !important;
}
</style>