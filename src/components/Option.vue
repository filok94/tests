<script lang="ts" setup>
import { ref, computed } from "vue";
import { OptionEmit } from '../types/testsTypes.interface'
const props = defineProps<{
  title: String,
  variants: Array<string | number>,
  probabiltyWarning: boolean | string
}>()
const emit = defineEmits<{ (e: "option-changed", target: OptionEmit): void }>()

//compute warning class for the probabilities API issue
let warning = computed(() => {
  if (
    props.title != props.probabiltyWarning &&
    selectedVariant.value != 1 &&
    !String(props.title).includes("Color")
  ) {
    return String(props.title).includes(props.probabiltyWarning as string);
  }
});

//chooser of option
let selectedVariant = ref(0);
let chooseVariant = (e: boolean) => {
  e ?
    selectedVariant.value + 1 != variants.value.length
      ? selectedVariant.value++
      : (selectedVariant.value = 0)
    : selectedVariant.value == 0
      ? (selectedVariant.value = variants.value.length - 1)
      : selectedVariant.value--

  emit("option-changed", { optionTitle: props.title as string, optionVariant: variants.value[selectedVariant.value] });
};

//computed properties for rendering
let optionTitle = computed(() => props.title.replace(/([A-Z])/g, " $1"));
let displayedSelectedVariant = computed(() => selectedVariant.value + 1);
let variants = computed(() => props.variants);
</script>

<template>
  <li>
    <button @click="chooseVariant(false)" class="option-button option-button_minus">-</button>
    <div class="option-text-container">
      <h3 class="option-title" :class="{ warning: warning }">{{ optionTitle }}</h3>
      <p class="option-numbers">{{ displayedSelectedVariant }}/{{ variants.length }}</p>
    </div>
    <button @click="chooseVariant(true)" class="option-button option-button_plus">+</button>
  </li>
</template>

<style lang="scss" scoped>
//dynamic classes
.warning {
  background: $gradient-red;
  @include bcg-for-text();
}

li {
  max-width: 45%;
  width: 10rem;
  height: 4rem;
  margin: 0.5rem 0;

  box-shadow: $shadow-black;
  background: $color-black-opacity;
  border-radius: $border-prime;
  @include blur-bcg();
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $color-grey;
  font-size: 0.7rem;

  .option-text-container {
    .option-title {
      margin: 0.2rem 0.1rem;
    }

    .option-numbers {
      margin: 0;
      background: $color-violet;
      @include bcg-for-text();
    }
  }

  .option-button {
    border: none;
    outline: none;
    height: 100%;
    width: 20%;
    cursor: pointer;
    font: $font;

    &_minus {
      background: $color-violet;
      border-radius: $border-prime 0px 0px 25px;
    }

    &_plus {
      background: $color-pink;
      border-radius: 0px 25px 25px 0px;
    }

    &:active {
      opacity: 0.7;
    }
  }
}

@media (min-width: $medium-screen) {
  li {
    height: 6rem;
    max-width: 100%;
    width: 13rem;
    font-size: 1.3rem;
  }
}
</style>