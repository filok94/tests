import axios from "axios";

const auth = axios.create({
  baseURL: `${import.meta.env.VITE_AUTH_URL}`,
});
export interface ISignInRequest {
  login: string;
  password: string;
}

export interface ISignInResponse {
  access_token: string;
  refresh_token: string;
  user: string;
}
export async function signIn(params: ISignInRequest): Promise<ISignInResponse> {
  const response = await auth.post<ISignInResponse>("sign_in", {
    ...params,
  });
  return response.data;
}
