<script lang="ts" setup>
import { reactive, computed, ref, watch, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import VButton from "../components/vButton.vue";
import VInput from "../components/vInput.vue";
import VPanel from "../components/vPanel.vue";
import { loginPageErrorHandler } from "../Helpers/errorHandlers/loginPageErrorHandler";
import { loginPage } from "../locales/loginPage";
import { setAuthDataToStorage, useSignIn } from "../api/auth/auth.api";
import { SIGN_URLS } from "../api/auth/auth.interfaces";
import { ROUTER_NAMES } from "../router";

const router = useRouter();
const route = useRoute();

let userInputs = reactive({
  login: "",
  password: "",
  confirmationPassowrd: "",
});
const { login, password, confirmationPassowrd } = toRefs(userInputs);

const { data, error, execution, isLoading, isFinished } = useSignIn();
const passwordError = ref<string | undefined>(undefined);
const loginError = ref<string | undefined>(undefined);
watch(password, (nValue, oValue) => {
  if (passwordError.value) {
    passwordError.value =
      nValue.length != oValue.length ? undefined : passwordError.value;
  }
});
watch(login, (nValue, oValue) => {
  if (loginError.value) {
    loginError.value =
      nValue.length != oValue.length ? undefined : loginError.value;
  }
});
watch(error, () => {
  if (error.value?.response?.status) {
    loginPageErrorHandler(
      error.value.response.status,
      passwordError,
      loginError
    );
  }
});
watch(isFinished, (nValue) => {
  if (nValue) {
    setAuthDataToStorage(data);
    router.push({
      name: ROUTER_NAMES.main,
      params: { userId: window.localStorage.getItem("user") },
    });
  }
});

const confirmPasswordWrongCondition = computed(
  () => confirmationPassowrd.value != password.value
);
const disableButtonCondition = computed(() => {
  const lengthCondition = login.value.length < 6 || password.value.length < 8;
  return route.name == ROUTER_NAMES.login.sign_in
    ? lengthCondition
    : lengthCondition || confirmPasswordWrongCondition.value;
});

const signByButton = () => {
  const methodUrl =
    route.name == ROUTER_NAMES.login.sign_in
      ? SIGN_URLS.sign_in
      : SIGN_URLS.sign_up;
  execution(methodUrl, { login, password });
};
</script>

<template>
  <VPanel class="login_page_panel">
    <div class="left-side">
      <VInput
        ref="panel"
        v-model="login"
        :label="'Login'"
        :max-length="20"
        :min-length="6"
        :type="'text'"
        :error="loginError"
      ></VInput>
    </div>
    <div class="right-side">
      <VInput
        v-model="password"
        :label="'Password'"
        :max-length="20"
        :min-length="6"
        :type="'password'"
        :error="passwordError"
      ></VInput>
      <VInput
        v-if="route.name == ROUTER_NAMES.login.sign_up"
        v-model="confirmationPassowrd"
        :label="'Confirm password'"
        :max-length="20"
        :min-length="6"
        :type="'password'"
        :error="
          confirmPasswordWrongCondition ? 'Passwords are different' : undefined
        "
      ></VInput>
    </div>
    <VButton
      class="auth_button"
      :purpose="'primary'"
      :disable="disableButtonCondition"
      :is-loading="isLoading"
      @click.prevent="signByButton"
      @entered="signByButton"
    >
      {{
        route.name == ROUTER_NAMES.login.sign_in
          ? loginPage.authButton
          : loginPage.regButton
      }}
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
