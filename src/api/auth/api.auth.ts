import axios from "axios";
export const authInstance = axios.create({
  baseURL: `${import.meta.env.VITE_AUTH_URL}`,
});
export const urls = {
  sign_in: "sign_in",
  sign_up: "sign_up",
  refresh_tokens: "refresh_tokens",
};
export interface ISignInRequest {
  login: string;
  password: string;
}
export const signInRequestData = (
  login: string,
  password: string
): ISignInRequest => {
  return { login, password };
};

export interface ISignInResponse {
  access_token: string;
  refresh_token: string;
  user: string;
}

export interface IRefreshTokensRequest {
  token: string;
}
export const refreshTokensData = (token: string): IRefreshTokensRequest => {
  return { token };
};
