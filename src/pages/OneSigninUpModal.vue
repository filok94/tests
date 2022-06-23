<script lang="ts" setup>
import { reactive, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import VButton from "../components/vButton.vue";
import { ISignInResponse, signIn, signUp } from "../api/api.auth";
import { asyncSetItem } from "../Helpers/asyncStorage";
import VInput from "../components/vInput.vue";
import VPanel from "../components/vPanel.vue";
import { loginPageErrorHandler } from "../Helpers/errorHandlers/loginPageErrorHandler";
import { loginPage } from "../locales/loginPage";

const router = useRouter();
const route = useRoute();

let userInputs = reactive({
  login: "",
  password: "",
  confirmationPassowrd: "",
});
const passwordError = ref<string | undefined>(undefined);
const loginError = ref<string | undefined>(undefined);
const confirmPasswordWrongCondition = computed(
  () => userInputs.confirmationPassowrd != userInputs.password
);
const disableButtonCondition = computed(() => {
  const lengthCondition =
    userInputs.login.length < 6 || userInputs.password.length < 8;
  return route.name == "Sign_in"
    ? lengthCondition
    : lengthCondition || confirmPasswordWrongCondition.value;
});
const signByButton = async () => {
  try {
    let response: null | ISignInResponse = null;
    if (route.name == "Sign_in") {
      response = await signIn({
        login: userInputs.login,
        password: userInputs.password,
      });
    } else {
      response = await signUp({
        login: userInputs.login,
        password: userInputs.password,
      });
    }
    await asyncSetItem("user", response.user);
    await router.push({
      name: "User",
      params: { userName: window.localStorage.getItem("user") },
    });
  } catch (e) {
    let errorMessage = "Unknown error";
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    loginPageErrorHandler(errorMessage, passwordError, loginError);
  }
};
const activeButtonName = computed(() =>
  route.name == "Sign_in" ? loginPage.authButton : loginPage.regButton
);
</script>

<template>
  <VPanel class="login_page_panel">
    <div class="left-side">
      <VInput
        ref="panel"
        :label="'Login'"
        :max-length="20"
        :min-length="6"
        :type="'text'"
        :error="loginError"
        @input-value="(e) => (userInputs.login = e)"
      ></VInput>
    </div>
    <div class="right-side">
      <VInput
        :label="'Password'"
        :max-length="20"
        :min-length="6"
        :type="'password'"
        :error="passwordError"
        @input-value="(e) => (userInputs.password = e)"
      ></VInput>
      <VInput
        v-if="route.name == 'Sign_up'"
        :label="'Confirm password'"
        :max-length="20"
        :min-length="6"
        :type="'password'"
        :error="
          confirmPasswordWrongCondition ? 'Passwords are different' : undefined
        "
        @input-value="(e) => (userInputs.confirmationPassowrd = e)"
      ></VInput>
    </div>
    <VButton
      class="auth_button"
      :purpose="'primary'"
      :disable="disableButtonCondition"
      @click.prevent="signByButton"
    >
      {{ activeButtonName }}
    </VButton>
  </VPanel>
</template>

<style lang="scss">
// state dynamic classes
.login_page_panel {
  margin: 2rem auto;
  max-width: 20%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 0.3fr;

  .left-side {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .right-side {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 2;
    grid-column-end: 3;
  }

  .auth_button {
    justify-self: center;
    align-self: center;
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 3;
  }
}
//static styles
</style>
