import { USER_STORAGE } from "./auth/auth.interfaces";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { watch } from "vue";
import { useRefreshToken, removeAuthDataFromStorage } from "./auth/auth.api";
import { useSignOut } from "./auth/useSignOut";

const { signOut } = useSignOut();

let requestRetries: Array<string | undefined> = [];

export function onResponeClearRetries(res: AxiosResponse) {
  if (requestRetries.includes(res.config.url) && res.status == 200) {
    const indexToRemove = requestRetries.findIndex((e) => e == res.config.url);
    requestRetries.splice(indexToRemove, 1);
  }
}

export function onResponeRefreshInstanceToken(
  instance: AxiosInstance,
  error: AxiosError
) {
  const originalRequest = error.config;

  if (!requestRetries.includes(originalRequest.url)) {
    requestRetries.push(originalRequest.url);
    const { refresh, isFinished } = useRefreshToken();
    if (
      error.response?.status === 401 &&
      !localStorage.getItem(USER_STORAGE.access_token)
    ) {
      removeAuthDataFromStorage();
    } else if (error.response?.status === 401 && originalRequest) {
      refresh();
      watch(isFinished, (nValue) =>
        nValue ? instance(originalRequest) : null
      );
    } else {
      return error;
    }
  } else {
    const indexToRemove = requestRetries.findIndex(
      (e) => e == originalRequest.url
    );
    requestRetries.splice(indexToRemove, 1);
    signOut();
  }
}
