<template>
    <button
        class="v-button"
        ref="buttonRef"
        @mouseenter="mouseHoverEvent($event.type)"
        @mouseleave="mouseHoverEvent($event.type)"
        :disabled="props.disable"
        :class="{ 'cancel': props.purpose == 'cancel', 'primary': props.purpose == 'primary' }"
    >
        <slot>Подтвердить</slot>
    </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useEventListener } from '@vueuse/core'
import gsap from 'gsap'

let props = defineProps<{
    disable?: boolean,
    purpose: 'cancel' | 'primary'
}>()

let emit = defineEmits<{
    (ev: "entered", voice: KeyboardEvent): void
}>()

let buttonRef = ref<null | Element>(null)

let mouseHoverEvent = (event: string) => {
    let stylesArray = [{ scale: 1, border: '25px 35px' }, { scale: 1.01, border: '35px 25px' }]
    let style = stylesArray[1]
    style = event == "mouseenter" && !props.disable ? stylesArray[1] : stylesArray[0]
    gsap.to(buttonRef.value, { scale: style.scale, borderRadius: style.border, duration: .3, ease: "ease" })
}

useEventListener(document, "keyup", (ev: KeyboardEvent) => ev.code == "Enter" ? emit("entered", ev) : undefined)

</script>

<style lang="scss" scoped>
.v-button {
    border-radius: $border-large $border-prime;
    border: none;

    font-family: $font;
    font-size: 1.5rem;

    padding: 1rem;

    color: $color-white;
    box-shadow: $shadow-black;

    z-index: 1;

    min-width: 16rem;
    width: 20%;

    cursor: pointer;
    &:disabled {
        background: $gradient-grey;
        box-shadow: none;
    }
    transition: 0.3s;
    &:active {
        box-shadow: none;
    }
}
.cancel {
    background: $gradient-grey;
    box-shadow: none;
}
.primary {
    background: $gradient;
    box-shadow: -1px 1px 8px 1px $color-violet,
        1px -1px 13px 1px $color-violet-5;
}
</style>