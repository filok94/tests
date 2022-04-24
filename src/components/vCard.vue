<script setup lang="ts">
import { ref, computed } from "vue";
import { hoverEffectOnText, hoverTransformScale } from "../Helpers/Animations";

let props = defineProps<{
  title?: string;
  description?: string;
  image?: string;
  hover?: {
    isHoverable: boolean;
    onElement?: "title" | "description";
  };
}>();
let hoverableElement = computed(() =>
  props.hover?.onElement == "title" ? titleRef.value : descriptionRef.value
);
let card = ref<HTMLElement | null>(null);
let titleRef = ref<HTMLElement | null>(null);
let descriptionRef = ref<HTMLElement | null>(null);

let hover = (e: MouseEvent) => {
  if (e.type == "mouseenter" && props.hover?.isHoverable) {
    hoverTransformScale(card.value, 102);
    hoverEffectOnText(hoverableElement.value, "");
  } else {
    hoverTransformScale(card.value, 100);
    hoverEffectOnText(hoverableElement.value, "hsl(0, 0%, 72%)");
  }
};
defineExpose({ card });
</script>
<template>
  <div
    ref="card"
    class="vcard-container"
    :class="{ 'vcard-hover': props.hover?.isHoverable }"
    @mouseenter="hover"
    @mouseleave="hover"
  >
    <h2 v-if="props.title" ref="titleRef" class="vcard-title">
      {{ props.title }}
    </h2>
    <img
      v-if="props.image"
      class="vcard-image"
      :src="props.image"
      alt="image in card"
      width="150"
    />
    <h3 v-if="props.description" ref="descriptionRef" class="vcard-description">
      {{ props.description }}
    </h3>
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
