import { USER_STORAGE } from "./auth/auth.interfaces";
import { AxiosError, AxiosInstance } from "axios";
import { watch } from "vue";
import { useRefreshToken, removeAuthDataFromStorage } from "./auth/useAuth.api";
import { useSignOut } from "./auth/useSignOut";

const { signOut } = useSignOut();

let requestRetries: Array<string | undefined> = [];

export function refreshInstanceToken(
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
    requestRetries.splice(indexToRemove);
    signOut();
  }
}
