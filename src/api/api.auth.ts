import axios from "axios";
import { asyncSetItem } from "../Helpers/asyncStorage";
import { errors } from "../locales/errors";
const auth = axios.create({
  baseURL: `${import.meta.env.VITE_AUTH_URL}`,
});
const urls = {
  sign_in: "sign_in",
  sign_up: "sign_up",
  refresh_tokens: "refresh_tokens",
};
auth.interceptors.response.use(
  (response) => {
    if (response != undefined) return response;
  },
  (err) => {
    throw new Error(err.message);
  }
);
export interface ISignInRequest {
  login: string;
  password: string;
}

export interface ISignInResponse {
  access_token: string;
  refresh_token: string;
  user: string;
}
const setTokens = async (fromResponse: ISignInResponse) => {
  await asyncSetItem("access_token", fromResponse.access_token);
  await asyncSetItem("refresh_token", fromResponse.refresh_token);
};
export interface IRefreshTokensRequest {
  token: string;
}
export async function signIn(params: ISignInRequest): Promise<ISignInResponse> {
  try {
    const response = await auth.post<ISignInResponse>(urls.sign_in, {
      ...params,
    });
    await setTokens(response.data);
    return response.data;
  } catch (e) {
    let errorMessage = errors.unknowError;
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    throw new Error(errorMessage);
  }
}

export async function signUp(params: ISignInRequest): Promise<ISignInResponse> {
  try {
    const response = await auth.post<ISignInResponse>(urls.sign_up, {
      ...params,
    });
    await setTokens(response.data);
    return response.data;
  } catch (e) {
    let errorMessage = errors.unknowError;
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    throw new Error(errorMessage);
  }
}

export async function refreshTokens(
  params: IRefreshTokensRequest
): Promise<ISignInResponse> {
  try {
    const response = await auth.post<ISignInResponse>(urls.refresh_tokens, {
      ...params,
    });
    await setTokens(response.data);
    return response.data;
  } catch (e) {
    let errorMessage = errors.unknowError;
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    throw new Error(errorMessage);
  }
}
