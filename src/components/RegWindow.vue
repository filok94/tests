<template>
  <div id="regAndAuth-window" ref="regAndAuthWindowRef">
    <form action="register">
      <label for="new-user">Login</label>
      <input
        id="new-user"
        type="text"
        v-model="userInputs.login"
        @focus.prevent="inputIsActive($event.target)"
      />
      <label for="new-password">Password</label>
      <input
        id="new-password"
        type="password"
        v-model="userInputs.password"
        @focus.prevent="inputIsActive($event.target)"
      />
      <label v-if="addConfirmPassword" for="confirm-password">Confirm Password</label>
      <input
        v-if="addConfirmPassword"
        id="confirm-password"
        type="password"
        v-model="userInputs.confirmationPassowrd"
        @focus.prevent="inputIsActive($event.target)"
      />
      <button @click.prevent="registerAndSigniIn()" :disabled="disableButton">Подтвердить</button>
    </form>
    <p v-show="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch, ref, computed } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AnimationPropertiesRegWindow } from '../types/testsTypes.interface'
import { useRouter } from "vue-router";
const localStorageSet = (key: string, value: any) => JSON.stringify(window.localStorage.setItem(key, value));
const router = useRouter();
const props = defineProps({
  activeWindow: String,
});
const auth = getAuth();

let addConfirmPassword = ref(false);
let userInputs = reactive({
  login: "",
  password: "",
  confirmationPassowrd: "",
});
const disableButton = computed(() => {
  let sum = 0;
  let condition = [userInputs.password.length < 6, userInputs.login.length < 1];
  condition.forEach((e) => {
    if (!e) {
      sum++;
    }
  });
  if (sum > 1) {
    return false;
  } else {
    return true;
  }
});
const registerAndSigniIn = () => {
  const signIn = (userInputLogin: string, userPassword: string) => {
    signInWithEmailAndPassword(auth, userInputLogin, userPassword)
      .then((data) => {
        let user = data.user;
        localStorageSet("isAuthed", true);
        localStorageSet("isAuthedBy", user.email);
        router.push({
          name: "User",
          params: { userName: window.localStorage.getItem("isAuthedBy") },
        });
      })
      .catch((error) => {
        localStorageSet("isAuthed", false);
        isErrorShown(error.code);
      });
  };
  switch (props.activeWindow) {
    case "register":
      if (
        userInputs.password === userInputs.confirmationPassowrd &&
        userInputs.password.length >= 6
      ) {
        createUserWithEmailAndPassword(
          auth,
          userInputs.login,
          userInputs.password
        )
          .then((data) => {
            const user = data.user;
            signIn(userInputs.login, userInputs.password);
          })
          .catch((error) => {
            isErrorShown(error.code);
          });
      } else {
        isErrorShown("Пароли не совпадают");
      }
      break;
    case "auth":
      signIn(userInputs.login, userInputs.password);
      break;
  }
};
const errorMessage = ref("");
const isErrorShown = (error: string) => {
  errorMessage.value = error;
  setTimeout(() => {
    errorMessage.value = "";
  }, 5000);
};

let animationProperties = reactive<AnimationPropertiesRegWindow>({
  to: null,
  from: null,
  timeout: null,
  get translatedTimeout() {
    return (this.timeout / 1000).toString() + "s";
  },
});
let regAndAuthWindowRef = ref<Element | null>(null)
watch(props, () => {
  document
    .querySelectorAll("label")
    .forEach((e) => e.classList.remove("label_up"));
  userInputs.login = userInputs.password = userInputs.confirmationPassowrd = "";
  let changeActiveWindow = (classToAnimate: string, to: string, from: string, timeout: number) => {
    regAndAuthWindowRef.value?.classList.add(classToAnimate);
    animationProperties.to = to;
    animationProperties.from = from;
    animationProperties.timeout = timeout;
    setTimeout(() => {
      regAndAuthWindowRef.value?.classList.remove(classToAnimate);
    }, timeout);
    setTimeout(() => {
      addConfirmPassword.value = !addConfirmPassword.value;
    }, timeout / 2);
  };
  if (props.activeWindow == "auth") {
    changeActiveWindow("animationing", "-30rem", "30rem", 300);
  } else {
    changeActiveWindow("animationing", "30rem", "-30rem", 300);
  }
});
let inputIsActive = (el: EventTarget | null) => {
  let inputElement = el as HTMLInputElement
  let labels = Array.prototype.slice.call(document.querySelectorAll("label"));
  let activeLabel = labels.filter((e) => e.htmlFor == inputElement.id)[0];
  activeLabel.classList.add("label_up");
  let changeClass = () => {
    if (inputElement.value.length == 0) {
      activeLabel.classList.remove("label_up");
    }
  };
  inputElement.addEventListener("blur", changeClass);
};
</script>
<style lang="scss">
// state dynamic classes
.label_up {
  transform: translateY(-1rem);
}
.animationing {
  @include going-away(
    v-bind("animationProperties.to"),
    v-bind("animationProperties.from"),
    v-bind("animationProperties.translatedTimeout")
  );
}
//static styles
#regAndAuth-window {
  border-radius: $border-prime;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 1rem;
  margin: 3rem 1rem;
  @include card-bcg();

  h1 {
    margin: 0 auto 4rem auto;
  }
  form {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    grid-gap: 1.1rem;
    margin: 1rem;

    input {
      display: block;
      border: none;
      font-size: 1rem;
      outline: none;
      border-bottom: 1px solid $color-white;
      background-color: transparent;
      color: $color-white;
      font-family: $font;
      &:focus {
        border-bottom: 1px solid $color-violet;
      }
      &:placeholder {
        color: $color-grey;
      }
    }
    label {
      position: relative;
      top: 2rem;
      justify-self: start;
      color: rgba(255, 255, 255, 0.568);
      transition: 0.3s ease-in-out;
    }
    button {
      justify-self: center;
      border-radius: $border-prime;
      cursor: pointer;
      background: $gradient;
      border: none;
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
      transition: 0.5s ease;
      padding: 1rem;
      font-size: 1.5rem;
      color: $color-white;
      font-family: $font;
      &:disabled {
        background: $color-grey;
        cursor: default;
        color: black;
        transform: scale(90%);
      }
      &:active {
        transform: scale(90%);
      }
    }
  }
  .error-message {
    background: $gradient-red;
    @include bcg-for-text();
    animation: error-shaking 0.9s ease-in-out;
    @keyframes error-shaking {
      0% {
        transform: translateY(-2rem);
        opacity: 0;
      }
      20% {
        transform: translateY(0);
        opacity: 1;
      }
      40%,
      60%,
      80% {
        transform: translateX(1rem);
      }
      30%,
      50%,
      70%,
      90% {
        transform: translateX(-1rem);
      }
      100% {
        transform: translateX(0);
      }
    }
  }
}

//media queries
@media (min-width: $medium-screen) {
  #regAndAuth-window {
    max-width: 80%;
    margin: 3rem auto;
  }
}

@media (min-width: $large-screen) {
  #regAndAuth-window {
    max-width: 718px;
    margin: 3rem auto;
  }
}
</style>