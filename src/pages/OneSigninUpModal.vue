<script lang="ts" setup>
import { reactive, computed, ref, watch, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import VButton from "../components/vButton.vue";
import { signInRequestData, ISignInResponse } from "../api/auth/api.auth";
import VInput from "../components/vInput.vue";
import VPanel from "../components/vPanel.vue";
import { loginPageErrorHandler } from "../Helpers/errorHandlers/loginPageErrorHandler";
import { loginPage } from "../locales/loginPage";
import { useAxios } from "@vueuse/integrations/useAxios";
import { authInstance } from "../api/auth/api.auth";

const router = useRouter();
const route = useRoute();

let userInputs = reactive({
  login: "",
  password: "",
  confirmationPassowrd: "",
});
const { login, password, confirmationPassowrd } = toRefs(userInputs);

const { data, error, execute, isLoading } = useAxios<ISignInResponse>(
  {
    method: "POST",
  },
  authInstance
);

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
watch(data, () => {
  if (data.value) {
    localStorage.setItem("user", data.value.user);
    localStorage.setItem("access_token", data.value.access_token);
    localStorage.setItem("refresh_token", data.value.refresh_token);
    router.push({
      name: "MainPage",
      params: { userName: window.localStorage.getItem("user") },
    });
  }
});

const confirmPasswordWrongCondition = computed(
  () => confirmationPassowrd.value != password.value
);
const disableButtonCondition = computed(() => {
  const lengthCondition = login.value.length < 6 || password.value.length < 8;
  return route.name == "Sign_in"
    ? lengthCondition
    : lengthCondition || confirmPasswordWrongCondition.value;
});

const signByButton = () => {
  const data = signInRequestData(login.value, password.value);
  let urlMethod = route.name == "Sign_in" ? "sign_in" : "sign_up";
  execute(urlMethod, { data });
};
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
        @input-value="(e) => (login = e)"
      ></VInput>
    </div>
    <div class="right-side">
      <VInput
        :label="'Password'"
        :max-length="20"
        :min-length="6"
        :type="'password'"
        :error="passwordError"
        @input-value="(e) => (password = e)"
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
        @input-value="(e) => (confirmationPassowrd = e)"
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
      {{ route.name == "Sign_in" ? loginPage.authButton : loginPage.regButton }}
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
