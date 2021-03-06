<script lang="ts" setup>
import { computed, onMounted, reactive, ref, Ref } from "vue";
import { useRouter } from "vue-router";
import { getDatabase, set, ref as fireRef } from "firebase/database";

import Option from "../components/Option.vue";
import Loading from "../components/Loading.vue";
import { Appearances } from "../Helpers/Animations";
import { useGlobal } from "../stores/global";
import VButton from "../components/vButton.vue";

const globalStore = useGlobal()
const router = useRouter();

// Pull avatar options from backend and render it
onMounted(() => {
  globalStore.getAvatars()
});
let avatar = computed(() =>
  globalStore.avatar ? globalStore.avatar : null
);

//animate apearence and exits
let avatarImageRef = ref<Element | null>(null);
let listOfOptions = ref<Element | null>(null);
let appearance = () => {
  Appearances.fromLeft(300, listOfOptions.value)
  Appearances.fromTop(300, avatarImageRef.value)
};
let confirmationAnimation = (i: Element) => {
  Appearances.fromLeft(300, i)
};
let confirmationAnimationLeave = (i: Element) => {
  Appearances.toRight(300, i)
};
let confirmationAnimationAfterLeave = (i: Element) => {
  Appearances.setPosition(300, i)
};
//every change from children call this function and rerender the avatar
let optionChanged = (event: Array<string | any>) => {
  renderedString.forEach((e, index) => {
    if (event[0] == e[0]) {
      renderedString.splice(index, 1);
    }
  });
  renderedString.push(event);
  probabilityWarningTitleClass.value = event[0];
  setTimeout(() => (probabilityWarningTitleClass.value = false), 300);
};
let renderedString = reactive<any[]>([]);

//helps with probabilities queries
let probabilityWarningTitleClass = ref(false);

//rendered image of avatar
let imageAvatar = computed(() => {
  let arrayOfQueries: string[] = [];
  renderedString.forEach((e) => {
    let stringOfQuery = `${e[0]}=${e[1]}&`;
    arrayOfQueries.push(stringOfQuery);
  });
  let stringifiedArrayOfQueries = arrayOfQueries.join("");
  return `https://avatars.dicebear.com/api/${avatar.value?.name}/:avatarOfMine.svg?${stringifiedArrayOfQueries}`;
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
  } catch (err: any) {
    console.log(err.message);
  }
};
</script>

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
          <v-button
            v-if="!confirmationWindowShown"
            @click.prevent="confirmationWindowShown = !confirmationWindowShown"
            :purpose="'primary'"
          >Сохранить аватар</v-button>
          <div class="confirmation-buttons-container" v-else>
            <h3 class="confirmation-title">Вы уверены?</h3>
            <v-button
              :purpose="'cancel'"
              @click.prevent="
                confirmationWindowShown = !confirmationWindowShown
              "
            >Нет</v-button>
            <v-button @click.prevent="saveTheRenderedAvatarAndGoBack" :purpose="'primary'">Да</v-button>
          </div>
        </transition>
      </div>
      <ul ref="listOfOptions">
        <Option
          v-for="(option, i) in avatar.options"
          :key="i"
          :title="String(i)"
          :variants="option"
          :probabilty-warning="probabilityWarningTitleClass"
          @option-changed="optionChanged"
        />
      </ul>
    </div>
    <Loading v-else />
  </transition>
</template>

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
    box-shadow: $shadow-black;
    background: $color-black-opacity;
    border-radius: $border-prime;
    @include blur-bcg();
    img {
      width: 15rem;
      align-self: center;
      justify-self: center;
    }
    .primary-button {
      justify-self: center;
      width: 15rem;

      outline: none;

      @include primary-button();
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
        color: $color-violet;
      }
      .confirmation-button {
        border: none;
        font-family: $font;
        font-size: 2rem;
        border-radius: $border-prime;
        padding: 0.5rem 2rem;
        transition: 0.3s ease-in-out;
        cursor: pointer;
        &-not {
          grid-area: no;
          background: $color-grey;
        }
        &-yes {
          grid-area: yes;
          background: $gradient;
          color: $color-white;
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