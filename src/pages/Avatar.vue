<template>
  <transition @enter="appearance">
    <div class="avatar-window" v-if="avatar">
      <div class="avatar-choosing-container" ref="avatarImageRef">
        <img :src="image" alt="avatar_picker" />
        <p>{{ avatar.options.length }}</p>
      </div>
      <ul>
        <Option
          v-for="(option, i) in avatar.options"
          :key="i"
          :title="i"
          :variants="option"
          @option-changed="optionChanged"
        />
      </ul>
    </div>
    <Loading v-else />
  </transition>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import Option from "../components/Option.vue";
import Loading from "../components/Loading.vue";
import { useAppearenceFromTop } from "../components/Animations";
const store = useStore();
let appearance = () => useAppearenceFromTop(avatarImageRef.value, 100);

let avatar = computed(() =>
  store.state.global.avatar ? store.state.global.avatar : null
);
let avatarImageRef = ref(null);
onMounted(() => {
  store.dispatch("getAvatars");
});
let rendered = reactive([]);

let optionChanged = (event) => {
  rendered.forEach((e, index) => {
    if (event[0] == e[0]) {
      rendered.splice(index, 1);
    }
  });
  rendered.push(event);
};
let image = computed(() => {
  let arrayOfQueries = [];
  rendered.forEach((e, index) => {
    let stringOfQuery = `${e[0]}=${e[1]}&`;
    arrayOfQueries.push(stringOfQuery);
  });
  let stringifiedArrayOfQueries = arrayOfQueries.join("");
  return `https://avatars.dicebear.com/api/${avatar.value.name}/:avatarOfMine.svg?${stringifiedArrayOfQueries}`;
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

    img {
      width: 300px;
    }
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