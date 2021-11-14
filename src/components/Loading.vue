<template>
  <div class="loader-square-container">
    <div
      class="loader-square"
      v-for="(square, i) of [1, 2, 3, 4]"
      :key="i"
      :ref="
        (el) => {
          if (el) loaderCirclesArray[i] = el;
        }
      "
    ></div>
  </div>
</template>
<script setup>
import gsap from "gsap";
import { onMounted, ref } from "vue";
let loaderCirclesArray = ref([]);
let circlesMovement = (circle) => {
  let timeline = gsap.timeline({
    repeat: -1,
    delay: circle / 5,
    defaults: { duration: 0.3, ease: "circ" },
  });
  timeline
    .to(loaderCirclesArray.value[circle], { x: -50, background: "#005ef1" })
    .to(loaderCirclesArray.value[circle], { y: 50, background: "#6025c3" })
    .to(loaderCirclesArray.value[circle], { x: 0, background: "#005ef1" })
    .to(loaderCirclesArray.value[circle], { y: 0, background: "#6025c3" });
};
let changingBorders = (stringToChange) => {
  let arrayHelper = [];
  for (let i = 0; i < 4; i++) {
    arrayHelper.push((Math.random() * (99 - 75) + 75).toFixed());
  }
  stringToChange.value = arrayHelper.join("% ") + "%";
};
let borders = ref("76px 93px 85px 92px");
onMounted(() => {
  circlesMovement(0);
  circlesMovement(1);
  circlesMovement(2);
  circlesMovement(3);

  setInterval(() => changingBorders(borders), 1000);
});
</script>

<style lang="scss">
.loader-square-container {
  position: fixed;
  top: 40vh;
  right: -50vw;
  width: 100vw;
  height: 100vh;
  .loader-square {
    position: fixed;
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    background: $prim-color;
    border-radius: v-bind("borders");
  }
}
</style>