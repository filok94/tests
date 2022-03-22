<template>
    <div class="v-button-container">
        <button class="v-button" ref="buttonRef">
            <slot>Подтвердить</slot>
        </button>
        <div v-if="props.hoverable && isButtonHovered" class="overlay">s</div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useEventListener } from '@vueuse/core'

let props = defineProps({
    disabled: {
        type: Boolean,
        default: true
    },
    hoverable: {
        type: Boolean,
        default: true
    },
    oneTimeState: {
        validator(value: string) {
            return ['warning', 'succes'].includes(value)
        }
    }
})

let isButtonHovered = ref(false)
let buttonRef = ref<null | Element>(null)
useEventListener(buttonRef, "mouseenter", (ev) => {
    isButtonHovered.value = true
    console.log(ev)
})
useEventListener(buttonRef, "mouseleave", (ev) => {
    isButtonHovered.value = false
    console.log(ev)
})

</script>

<style lang="scss" scoped>
.v-button {
    border-radius: 25px;
    border: none;

    font-family: $font;
    font-size: 1.5rem;

    padding: 1rem;

    color: $prim-text;
    background: $gradient;
    box-shadow: $card-shadow;

    z-index: 1;

    cursor: pointer;
    &:hover {
        transform: scale(100.5%);
    }
}
.overlay {
    min-width: 100%;
    min-height: 100%;
    background: rgba(24, 136, 211, 0.664);
    z-index: 2;
}
</style>