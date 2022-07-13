import { useAxios } from "@vueuse/integrations/useAxios";
import { Ref, watch } from "vue";
import {
  ISignInResponse,
  authInstance,
  ISignInRequest,
  SIGN_URLS,
  USER_STORAGE,
} from "./auth.interfaces";

export function useSignIn() {
  const { data, error, execute, isLoading, isFinished } =
    useAxios<ISignInResponse>(
      {
        method: "POST",
      },
      authInstance
    );

  function execution(url: SIGN_URLS, credentials: ISignInRequest) {
    execute(url, {
      data: {
        login: credentials.login.value,
        password: credentials.password.value,
      },
    });
  }

  return { data, error, execution, isLoading, isFinished };
}

export function useRefreshToken() {
  const { data, error, execute, isFinished } = useAxios<ISignInResponse>(
    {
      method: "POST",
    },
    authInstance
  );
  function refresh() {
    execute(SIGN_URLS.refresh_token, {
      data: {
        refresh_token: localStorage.getItem(USER_STORAGE.refresh_token),
      },
    });
  }
  watch(data, (newTokens) => {
    if (newTokens) setAuthDataToStorage(data);
  });
  watch(error, (nError) => {
    if (nError?.response?.status == 401) {
      removeAuthDataFromStorage();
    }
  });

  return { data, error, refresh, isFinished };
}

export const setAuthDataToStorage = (
  data: Ref<ISignInResponse | undefined>
): void => {
  if (data.value) {
    localStorage.setItem(USER_STORAGE.access_token, data.value.access_token);
    localStorage.setItem(USER_STORAGE.refresh_token, data.value.refresh_token);
    localStorage.setItem(USER_STORAGE.user, data.value.user);
  }
};

export const removeAuthDataFromStorage = (): void => {
  const items = Object.values(USER_STORAGE);
  items.forEach((e) => localStorage.removeItem(e));
};
