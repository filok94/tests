import axios, { AxiosError } from "axios";
import { USER_STORAGE } from "../auth/auth.interfaces";
import {
  onResponeClearRetries,
  onResponeRefreshInstanceToken,
} from "../refreshInstanceToken";

export const avatarInstance = axios.create({
  baseURL: import.meta.env.VITE_AVATAR_URL,
});

avatarInstance.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers["token"] = String(
        localStorage.getItem(USER_STORAGE.access_token)
      );
      return config;
    }
  },
  (err) => Promise.reject(err)
);
avatarInstance.interceptors.response.use(
  async (r) => {
    onResponeClearRetries(r);
    return r;
  },
  async (e: AxiosError) => onResponeRefreshInstanceToken(avatarInstance, e)
);

export interface IResponseGetMyAvatar {
  ref_link: string;
}

export interface IResponseGetAllAvatars {
  ref_name: string;
  base_link: string;
  id: string;
}

export interface IResponseGetAvatarById {
  ref_name: string;
  base_link: string;
  props: {
    prop_name: string;
    prop_values: string[];
    with_probability: boolean;
  }[];
}

export interface IRequsetParamsGetAvatarById {
  avatar_id: string;
}

export interface IRequestSaveAvatar {
  full_link: string;
  avatar: string;
}

export interface IResponseSaveAvatar {
  saved: boolean;
}
