<template>
    <div class="prim-button">
        <button>1123{{ }}</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

let emit = defineEmits(['button-emmit'])
let props = defineProps([])
class Button {
    constructor(name, path, isDisabledbyDefault=false) {
        this.name = name;
        this.path = path;
        this.isDisabledbyDefault = isDisabledbyDefault;
    }
    aliving() {
        console.log(this.name + " is alive")
    }
}
onMounted(() => {
    emit('button-emmit', Button)

})
</script>

<style lang="scss" scoped>
</style>