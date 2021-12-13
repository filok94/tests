<template>
  <transition @enter="appearance">
    <div class="avatar-window" v-if="avatar">
      <div class="avatar-image-saver" ref="avatarImageRef">
        <img :src="imageAvatar" alt="avatar_picker" />
        <transition
          @enter="confirmationAnimation($event)"
          @leave="confirmationAnimationLeave($event)"
          @before-enter="confirmationAnimationAfterLeave($event)"
          :duration="200"
          mode="out-in"
        >
          <button
            v-if="!confirmationWindowShown"
            class="primary-button"
            @click.prevent="confirmationWindowShown = !confirmationWindowShown"
          >
            Сохранить аватар
          </button>
          <div class="confirmation-buttons-container" v-else>
            <h3 class="confirmation-title">Вы уверены?</h3>
            <button
              class="confirmation-button confirmation-button-not"
              @click.prevent="
                confirmationWindowShown = !confirmationWindowShown
              "
            >
              Нет
            </button>
            <button
              class="confirmation-button confirmation-button-yes"
              @click.prevent="saveTheRenderedAvatarAndGoBack"
            >
              Да
            </button>
          </div>
        </transition>
      </div>
      <ul ref="listOfOptions">
        <Option
          v-for="(option, i) in avatar.options"
          :key="i"
          :title="i"
          :variants="option"
          :probabilty-warning="probabilityWarningTitleClass"
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
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { getDatabase, set, ref as fireRef } from "firebase/database";

import Option from "../components/Option.vue";
import Loading from "../components/Loading.vue";
import {
  useAppearenceFromTop,
  useAppearenceFromLeft,
  useGoAwayToRight,
  useSetPosition,
} from "../components/Animations";
const store = useStore();
const router = useRouter();

// Pull avatar options from backend and render it
onMounted(() => {
  store.dispatch("getAvatars");
});
let avatar = computed(() =>
  store.state.global.avatar ? store.state.global.avatar : null
);

//animate apearence and exits
let avatarImageRef = ref(null);
let listOfOptions = ref(null);
let appearance = () => {
  useAppearenceFromLeft(listOfOptions.value, 300);
  useAppearenceFromTop(avatarImageRef.value, 300);
};
let confirmationAnimation = (i) => {
  useAppearenceFromLeft(i, 300);
};
let confirmationAnimationLeave = (i) => {
  useGoAwayToRight(i, 300);
};
let confirmationAnimationAfterLeave = (i) => {
  useSetPosition(i, 300);
};
//every change from children call this function and rerender the avatar
let optionChanged = (event) => {
  renderedString.forEach((e, index) => {
    if (event[0] == e[0]) {
      renderedString.splice(index, 1);
    }
  });
  renderedString.push(event);
  probabilityWarningTitleClass.value = event[0];
  setTimeout(() => (probabilityWarningTitleClass.value = false), 300);
};
let renderedString = reactive([]);

//helps with probabilities queries
let probabilityWarningTitleClass = ref(false);

//rendered image of avatar
let imageAvatar = computed(() => {
  let arrayOfQueries = [];
  renderedString.forEach((e, index) => {
    let stringOfQuery = `${e[0]}=${e[1]}&`;
    arrayOfQueries.push(stringOfQuery);
  });
  let stringifiedArrayOfQueries = arrayOfQueries.join("");
  return `https://avatars.dicebear.com/api/${avatar.value.name}/:avatarOfMine.svg?${stringifiedArrayOfQueries}`;
});

//save and exit with confirm
let confirmationWindowShown = ref(false);
let saveTheRenderedAvatarAndGoBack = async () => {
  let avatarImageToSave = imageAvatar.value;
  let userId = window.localStorage.getItem("isAuthedById");
  const db = getDatabase();
  try {
    await set(fireRef(db, `users/${userId}/avatar`), avatarImageToSave);
    await router.push({
      name: "User",
      params: { userName: window.localStorage.getItem("isAuthedBy") },
    });
  } catch (err) {
    console.log(err.message);
  }
};
</script>



<style lang="scss" scoped>
.avatar-window {
  display: inline-block;
  .avatar-image-saver {
    position: sticky;
    top: 0.1rem;
    z-index: 1;
    max-height: 35%;
    max-width: 35rem;

    display: flex;
    padding: 1rem;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
    @include card-bcg();
    img {
      width: 15rem;
      align-self: center;
      justify-self: center;
    }
    .primary-button {
      justify-self: center;
      width: 15rem;
      padding: 0.8rem;

      font-size: 1.5rem;
      background: $gradient;
      border: none;
      outline: none;
      box-shadow: $card-shadow;
      color: $prim-text;
      border-radius: 25px;
      cursor: pointer;
      font-family: $font;
      &:hover {
        opacity: 0.9;
      }
      &:active {
        transition: 0.1s;
        transform: scale(100%);
        opacity: 0.7;
      }
    }
    .confirmation-buttons-container {
      display: grid;
      grid-template-areas: "title title" "no yes";
      justify-content: space-evenly;
      justify-items: stretch;
      width: 90%;
      .confirmation-title {
        font-size: 1.5rem;
        margin: 0;
        grid-area: title;
        color: $prim-color;
      }
      .confirmation-button {
        border: none;
        font-family: $font;
        font-size: 2rem;
        border-radius: 25px;
        padding: 0.5rem 2rem;
        transition: 0.3s ease-in-out;
        cursor: pointer;
        &-not {
          grid-area: no;
          background: $grey-color;
        }
        &-yes {
          grid-area: yes;
          background: $gradient;
          color: $prim-text;
          &:hover {
            transform: scale(102%);
          }
        }
      }
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 1rem;
    margin: 0;
    padding: 0;
  }
}
@media (min-width: $medium-screen) {
  .avatar-image-saver {
    left: calc(50% - 20rem);
  }
}
@media (min-width: $upper-large-screen) {
  .avatar-window {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-gap: 1rem;

    .avatar-image-saver {
      position: static;
      width: 40rem;
      max-height: 50rem;
      img {
        width: 40rem;
      }
    }
  }
}
</style>