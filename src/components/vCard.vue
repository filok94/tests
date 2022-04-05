<script setup lang="ts">

import { ref, computed } from 'vue'
import { hoverEffectOnText, hoverTransformScale } from "../Helpers/Animations"

let props = defineProps<{
    title?: string,
    description?: string,
    image?: string,
    hover?: {
        isHoverable: boolean,
        onElement?: 'title' | 'description'
    }
}>()
let hoverableElement = computed(() => props.hover?.onElement == 'title' ? titleRef.value : descriptionRef.value)
let card = ref<Element | null>(null)
let titleRef = ref<Element | null>(null)
let descriptionRef = ref<Element | null>(null)

let hover = (e: MouseEvent) => {
    if (e.type == 'mouseenter' && props.hover?.isHoverable) {
        hoverTransformScale(card.value, 102)
        hoverEffectOnText(hoverableElement.value, "")
    } else {
        hoverTransformScale(card.value, 100)
        hoverEffectOnText(hoverableElement.value, "hsl(0, 0%, 72%)")
    }
}
defineExpose({ card })
</script>
<template>
    <div
        class="vcard-container"
        :class="{ 'vcard-hover': props.hover?.isHoverable }"
        ref="card"
        @mouseenter="hover"
        @mouseleave="hover"
    >
        <h2 class="vcard-title" v-if="props.title" ref="titleRef">{{ props.title }}</h2>
        <img
            class="vcard-image"
            :src="props.image"
            alt="image in card"
            v-if="props.image"
            width="150"
        />
        <h3
            class="vcard-description"
            ref="descriptionRef"
            v-if="props.description"
        >{{ props.description }}</h3>
        <slot></slot>
    </div>
</template>
<style lang="scss">
.vcard-container {
    padding: 0.5rem 1.5rem;

    display: grid;
    grid-template-columns: 1fr;

    grid-gap: 0;
    justify-items: start;
    align-items: end;
    text-align: start;

    border-radius: $border-prime;
    box-shadow: $shadow-black;
    @include blur-bcg;
    background: $color-black-opacity;
    max-width: 30rem;

    .vcard-description {
        color: $color-grey;
    }
    &:hover {
        .vcard-title {
            background: $gradient;
            @include bcg-for-text();
        }
    }
}
.vcard-image {
    border-radius: $border-prime;
}
.vcard-hover {
    cursor: pointer;
}
</style>