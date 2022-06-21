<script lang="ts" setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import VButton from "./vButton.vue";
import { signIn } from "../api/api.auth";
import { asyncSetItem } from "../Helpers/asyncStorage";
import VInput from "./vInput.vue";
import VPanel from "./vPanel.vue";
const router = useRouter();

const props = defineProps<{
  activeWindow: "auth" | "reg";
}>();

let userInputs = reactive({
  login: "",
  password: "",
  confirmationPassowrd: "",
});
const disableButton = computed(
  () => userInputs.password.length < 8 || userInputs.login.length < 6
);

const login = async () => {
  const response = await signIn({
    login: userInputs.login,
    password: userInputs.password,
  });
  await asyncSetItem("user", response.user);
  await router.push({
    name: "User",
    params: { userName: window.localStorage.getItem("user") },
  });
};

const activeButtonName = computed(() =>
  props.activeWindow == "auth" ? "Авторизоваться" : "Создать аккаунт"
);
</script>

<template>
  <VPanel class="login_page_panel">
    <h1>{{}}</h1>
    <VInput
      :label="'Login'"
      :max-length="20"
      :min-length="6"
      :type="'text'"
      :error="undefined"
    ></VInput>
    <VInput
      :label="'Password'"
      :max-length="20"
      :min-length="6"
      :type="'password'"
    ></VInput>
    <VButton
      :purpose="'primary'"
      :disable="disableButton"
      @click.prevent="login"
    >
      {{ activeButtonName }}
    </VButton>
  </VPanel>
</template>

<style lang="scss">
// state dynamic classes
.login_page_panel {
  margin: 2rem auto;
}
//static styles
</style>
