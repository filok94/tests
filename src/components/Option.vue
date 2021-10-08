<template>
    <li>
        <img
            src="../assets/back.svg"
            width="30"
            alt="back_button"
            @click="changeCurrentNumberofOption(mathSymbol = false)"
        />
        {{ alias }}
        <img
            src="../assets/back.svg"
            width="30"
            alt="forward-button"
            class="option-forward-button"
            @click="changeCurrentNumberofOption(mathSymbol = true)"
        />
        <p>{{ currentNumberOfOption }}/{{ props.collection.length - 1 }}</p>
    </li>
</template>

<script setup>
import { computed, ref, onBeforeUpdate, watch } from 'vue'
import { useStore } from 'vuex'
const props = defineProps({
    thisNumber: Number,
    uri: String,
    collection: Array,
    alias: String
})
const store = useStore()
const currentNumberOfOption = ref(0)
let changeCurrentNumberofOption = (mathSymbol) => {
    if (mathSymbol) {
        if (currentNumberOfOption.value + 1 != props.collection.length) {
            currentNumberOfOption.value++
        } else currentNumberOfOption.value = 0
    } else if (currentNumberOfOption.value == 0) {
        currentNumberOfOption.value = props.collection.length - 1
    } else currentNumberOfOption.value--
}
const currentOption = computed(() => [props.uri, props.collection[currentNumberOfOption.value], props.thisNumber])
onBeforeUpdate(() => store.commit('changeChoosenOptions', currentOption.value))
watch(props, () => {
    currentNumberOfOption.value = 0
})
let a = 1123
</script>

<style lang="scss" scoped>
li {
    margin: 0.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
}
</style>