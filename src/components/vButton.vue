<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useEventListener } from "@vueuse/core";
import gsap from "gsap";

let props = defineProps<{
  disable?: boolean;
  purpose: "cancel" | "primary";
  size?: "small" | "medium" | "large";
}>();

let emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (ev: "entered", voice: KeyboardEvent): void;
}>();

let buttonRef = ref<null | Element>(null);

let mouseHoverEvent = (event: string) => {
  let borders = [30, 35];
  let style = borders[1];
  style = event == "mouseenter" && !props.disable ? borders[1] : borders[0];
  gsap.to(buttonRef.value, {
    borderRadius: style,
    duration: 0.3,
    ease: "ease",
  });
};

useEventListener(document, "keyup", (ev: KeyboardEvent) =>
  ev.code == "Enter" ? emit("entered", ev) : undefined
);

const dynamicClasses = reactive({
  v_button_cancel: props.purpose == "cancel",
  v_button_primary: props.purpose == "primary",
  v_button_small: props.size == "small",
  v_button_medium: props.size == "medium" || props.size == undefined,
  v_button_large: props.size == "large",
});
</script>

<template>
  <button
    ref="buttonRef"
    :disabled="props.disable"
    :class="dynamicClasses"
    class="v_button"
    @mouseenter="mouseHoverEvent($event.type)"
    @mouseleave="mouseHoverEvent($event.type)"
  >
    <slot>Подтвердить</slot>
  </button>
</template>

<style lang="scss" scoped>
.v_button {
  border-radius: $border-large;
  border: none;
  max-height: 5rem;

  font-family: $font;
  font-size: 1.5rem;

  padding: 1rem;

  color: $color-white;
  box-shadow: $shadow-black;

  z-index: 1;

  //width: 20%;

  cursor: pointer;
  &:disabled {
    background: $gradient-grey;
    box-shadow: none;
  }
  transition: 0.3s;
  &:active {
    box-shadow: none;
  }
  &_cancel {
    background: $gradient-grey;
    box-shadow: none;
  }
  &_primary {
    background: $gradient;
    box-shadow: -1px 1px 8px 1px $color-violet,
      1px -1px 13px 1px $color-violet-5;
  }
  &_small {
    max-width: 6rem;
    font-size: 0.5rem;
  }

  &_medium {
    max-width: 10rem;
    font-size: 1rem;
  }

  &_large {
    max-width: 16rem;
    font-size: 1.5rem;
  }
}
</style>
