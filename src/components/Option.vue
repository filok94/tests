<template>
  <li>
    <button @click="chooseVariant(false)">Minus</button>
    <h3>{{ title }}</h3>
    <p>{{ selectedVariant + 1 }}/{{ variants.length }}</p>
    <button @click="chooseVariant(true)">Plus</button>
  </li>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
const props = defineProps({
  title: String,
  variants: Array,
});

const emit = defineEmits(["option-changed"]);
let variants = computed(() => props.variants);
let selectedVariant = ref(0);
let chooseVariant = (e) => {
  e
    ? selectedVariant.value + 1 != variants.value.length
      ? selectedVariant.value++
      : (selectedVariant.value = 0)
    : selectedVariant.value == 0
    ? (selectedVariant.value = variants.value.length - 1)
    : selectedVariant.value--;
  emit("option-changed", [props.title, variants.value[selectedVariant.value]]);
};
</script>

<style lang="scss" scoped>
li {
  margin: 0.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  color: white;
  button {
    font-size: 1rem;
  }
}
</style>