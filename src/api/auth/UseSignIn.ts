import { useAxios } from "@vueuse/integrations/useAxios";
import {
  ISignInResponse,
  authInstance,
  ISignInRequest,
  SIGN_URLS,
} from "./api.auth";

export function useSignIn() {
  const { data, error, execute, isLoading } = useAxios<ISignInResponse>(
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

  return { data, error, execution, isLoading };
}
