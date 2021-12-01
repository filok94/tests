<template>
  <transition @enter="appearance">
    <div class="avatar-window" v-if="styledAvatar">
      <div class="avatar-choosing-container">
        <img
          src="../assets/back.svg"
          width="50"
          alt="back_button"
          class="option-change-avatar"
          @click="chooseAvatar(false)"
        />
        <div ref="avatarImageRef" v-html="svgAvatar"></div>
        <img
          src="../assets/back.svg"
          width="50"
          alt="forward-button"
          class="option-forward-button option-change-avatar"
          @click="chooseAvatar(true)"
        />
      </div>
      <ul>
        <Option
          v-for="(option, i) in arrayOfOptions"
          :key="i"
          :me="i"
          :title="option[0]"
          :variants="option[1]"
          @option-changed="optionChanged"
        />
      </ul>
    </div>
    <Loading v-else />
  </transition>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { createAvatar } from "@dicebear/avatars";
import * as bots from "@dicebear/avatars-bottts-sprites";
import * as smiles from "@dicebear/big-smile";
import * as croodles from "@dicebear/croodles";
import * as miniavs from "@dicebear/miniavs";
import Option from "../components/Option.vue";
import Loading from "../components/Loading.vue";
import { useAppearenceFromTop } from "../components/Animations";
import all from "gsap/all";
const store = useStore();
let appearance = () => useAppearenceFromTop(avatarImageRef.value, 100);

let avatarImageRef = ref(null);
onMounted(() => {
  store.dispatch("getAvatars");
});

let avatarHelper = (designStyle) => {
  let obj = {};
  Object.entries(designStyle.schema.properties).forEach(([key, value]) => {
    let arrayOfValues = null;
    switch (value.type) {
      case "array":
        arrayOfValues = value.items.enum
          ? value.items.enum
          : value.items.anyOf[0].enum;
        break;
      case "integer":
        arrayOfValues = value.enum
          ? value.enum
          : [value.minimum, value.maximum];
        break;
      case "boolean":
        arrayOfValues = [true, false];
    }
    obj[key] = arrayOfValues;
  });
  obj.seed = [`myAvatar`, "bu", "ba", "buba"];
  obj.size = [300];
  return obj;
};
let allAvatars = [bots, smiles, croodles, miniavs];
let avatarObject = reactive({});
let avatarPicker = ref(0);
let arrayOfOptions = computed(() =>
  Object.entries(avatarHelper(allAvatars[avatarPicker.value]))
);

let chooseAvatar = (e) => {
  for (let i of Object.keys(avatarObject)) {
    delete avatarObject[i];
  }
  e
    ? avatarPicker.value + 1 != allAvatars.length
      ? avatarPicker.value++
      : (avatarPicker.value = 0)
    : avatarPicker.value == 0
    ? (avatarPicker.value = allAvatars.length - 1)
    : avatarPicker.value--;
};
let optionChanged = (event) => {
  avatarObject[event[0]] = event[1];
};
let svgAvatar = ref(createAvatar(allAvatars[avatarPicker.value], {}));

watch(avatarObject, (newValue, oldValue) => {
  console.log(newValue, allAvatars[avatarPicker.value]);
  svgAvatar.value = createAvatar(allAvatars[avatarPicker.value], newValue);
});
//////////////////////////

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
//отрисовка аватара на основании данных из опций
const currentImage = computed(
  () =>
    `https://avatars.dicebear.com/api/${styledAvatar.value.name}/:seed.svg?${store.state.global.choosenOptions[0].uri}=${store.state.global.choosenOptions[0].value}&${store.state.global.choosenOptions[1].uri}=${store.state.global.choosenOptions[1].value}&${store.state.global.choosenOptions[2].uri}=${store.state.global.choosenOptions[2].value}&${store.state.global.choosenOptions[3].uri}=${store.state.global.choosenOptions[3].value}&${store.state.global.choosenOptions[4].uri}=${store.state.global.choosenOptions[4].value}&${store.state.global.choosenOptions[5].uri}=${store.state.global.choosenOptions[5].value}&${store.state.global.choosenOptions[6].uri}=${store.state.global.choosenOptions[6].value}`
);
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