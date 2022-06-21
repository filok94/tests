<script setup lang="ts"></script>
<template>
  <div class="v_panel">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.v_panel {
  background-color: $color-black;
  border-radius: $border-prime;
  border: solid $color-violet 1px;
  box-shadow: $shadow-black;
  padding: 2rem 2.5rem;
  max-width: max-content;
}
</style>
