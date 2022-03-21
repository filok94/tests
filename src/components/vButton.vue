<template>
    <div>
        <button class="vButton">
            <slot></slot>
        </button>
    </div>
</template>

<script lang="ts" setup>
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

</script>

<style lang="scss" scoped>
</style>