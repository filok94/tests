<template>
  <div class="avatar-window" v-if="styledAvatar">
    <div class="avatar-choosing-container">
      <img
        src="../assets/back.svg"
        width="50"
        alt="back_button"
        class="option-change-avatar"
        @click="changeAvatar(false)"
      />
      <!-- <img :src="currentImage" alt="avatar" width="250" /> -->
      <div v-html="svgAvatar"></div>
      <img
        src="../assets/back.svg"
        width="50"
        alt="forward-button"
        class="option-forward-button option-change-avatar"
        @click="changeAvatar(true)"
      />
    </div>
    <ul>
      <Option
        v-for="(avatar, i) in styledAvatar.optionCollection"
        :key="i"
        :thisNumber="i"
        :uri="avatar.uri"
        :collection="avatar.collection"
        :alias="avatar.alias"
      />
    </ul>
  </div>
  <Loading v-else />
</template>

<script setup>
import { computed, onMounted, ref, reactive, watch } from "vue";
import { useStore } from "vuex";
import { createAvatar } from "@dicebear/avatars";
import * as male from "@dicebear/avatars-male-sprites";
import * as avatars from "@dicebear/avatars-avataaars-sprites";
import Options from "@dicebear/avatars-avataaars-sprites";
import * as bots from "@dicebear/avatars-bottts-sprites";
import * as smiles from "@dicebear/big-smile";
import * as croodles from "@dicebear/croodles";
import * as miniavs from "@dicebear/miniavs";
import Option from "../components/Option.vue";
import Loading from "../components/Loading.vue";
const store = useStore();

let svgAvatar = createAvatar(bots, {
  seed: "boots",
  size: 300,
  colors: "amber",
  colorful: true,
  primaryColorLevel: 500,
});
const currentAvatar = ref(0); //какой по счету аватар выбран
//стрелочка влево-вправо принимает в себя параметр, означающий пролистывание влево или вправо
let changeAvatar = (mathSymbol) => {
  //если листаем вправо
  if (mathSymbol) {
    if (currentAvatar.value + 1 != store.state.global.avatars.length) {
      currentAvatar.value++;
    } else currentAvatar.value = 0;
    //если листаем влево
  } else if (currentAvatar.value == 0) {
    currentAvatar.value = store.state.global.avatars.length - 1;
  } else currentAvatar.value--;
};
//какой аватар выбран
const styledAvatar = computed(() =>
  store.state.global.avatars
    ? store.state.global.avatars[currentAvatar.value]
    : false
);
// отрисовка аватара на основании данных из опций
const currentImage = computed(
  () =>
    `https://avatars.dicebear.com/api/${styledAvatar.value.name}/:seed.svg?${store.state.global.choosenOptions[0].uri}=${store.state.global.choosenOptions[0].value}&${store.state.global.choosenOptions[1].uri}=${store.state.global.choosenOptions[1].value}&${store.state.global.choosenOptions[2].uri}=${store.state.global.choosenOptions[2].value}&${store.state.global.choosenOptions[3].uri}=${store.state.global.choosenOptions[3].value}&${store.state.global.choosenOptions[4].uri}=${store.state.global.choosenOptions[4].value}&${store.state.global.choosenOptions[5].uri}=${store.state.global.choosenOptions[5].value}&${store.state.global.choosenOptions[6].uri}=${store.state.global.choosenOptions[6].value}`
);
onMounted(() => {
  store.dispatch("getAvatars");
  let obj = {};
  Object.entries(bots.schema.properties).forEach(([key, value]) => {
    let firstValue = null;
    switch (value.type) {
      case "array":
        firstValue = value.items.enum[0];
        break;
      case "integer":
        firstValue = value;
    }
    obj[key] = firstValue;
  });
  console.log(obj);
  console.log(Object.values(bots.schema.properties));
});

let avatarHelper = (designStyle) => {
  let types = ["string", "array", "boolean", "integer"];
  Object.entries(designStyle.schema.properties);
};
</script>



<style lang="scss" scoped>
.avatar-window {
  padding: 1rem 0;
  .avatar-choosing-container {
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px;
  }
  ul {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0;
    padding: 0;
    margin: 1rem;
  }
}
.option-forward-button {
  transform: rotate(180deg);
}
</style>