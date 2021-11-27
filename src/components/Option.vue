<template>
  <li>
    <!-- <img
      src="../assets/back.svg"
      width="30"
      alt="back_button"
      @click="changeCurrentNumberofOption((mathSymbol = false))"
    />
    {{ alias }}
    <img
      src="../assets/back.svg"
      width="30"
      alt="forward-button"
      class="option-forward-button"
      @click="changeCurrentNumberofOption((mathSymbol = true))"
    />
    <p>{{ currentNumberOfOption }}/{{ props.collection.length - 1 }}</p> -->
    <button @click="chooseVariant(false)">Minus</button>
    <h3>{{ props.title }}</h3>
    <p>{{ selectedVariant + 1 }}/{{ variants.length }}</p>
    <button @click="chooseVariant(true)">Plus</button>
  </li>
</template>

<script setup>
import { computed, ref, onBeforeUpdate, watch, reactive, onMounted } from "vue";
import { useStore } from "vuex";
const props = defineProps({
  me: Number,
  title: String,
  variants: Array,
});

const emit = defineEmits(["option-changed"]);
let variants = reactive(props.variants);
let selectedVariant = ref(0);
let chooseVariant = (e) => {
  e
    ? selectedVariant.value + 1 != variants.length
      ? selectedVariant.value++
      : (selectedVariant.value = 0)
    : selectedVariant.value == 0
    ? (selectedVariant.value = variants.length - 1)
    : selectedVariant.value--;
  emit("option-changed", [props.title, variants[selectedVariant.value]]);
};
onMounted(() => {
  emit("option-changed", [props.title, variants[selectedVariant.value]]);
});

// const currentOption = computed(() => [
//   props.uri,
//   props.collection[currentNumberOfOption.value],
//   props.thisNumber,
// ]);
// onBeforeUpdate(() => store.commit("changeChoosenOptions", currentOption.value));
// watch(props, () => {
//   currentNumberOfOption.value = 0;
// });
// let a = 1123;
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