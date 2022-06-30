import axios, { AxiosError } from "axios";
import { USER_STORAGE } from "../auth/auth.interfaces";
import { refreshInstanceToken } from "../refreshInstanceToken";

export const gameControllerInstance = axios.create({
  baseURL: `${import.meta.env.VITE_GAMES_URL}`,
});

gameControllerInstance.interceptors.request.use(
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
gameControllerInstance.interceptors.response.use(
  async (r) => r,
  async (e: AxiosError) => refreshInstanceToken(gameControllerInstance, e)
);

export const GAME_URLS = {
  get_all: "get_all",
  get_questions: "get_questions",
  calculate: "calculate",
  get_results: "get_results",
} as const;
// eslint-disable-next-line no-redeclare
export type GAME_URLS = typeof GAME_URLS[keyof typeof GAME_URLS];

export interface IGetAllGamesResponse {
  _id: string;
  title: string;
  descripton: string;
  persons: string[];
  link: string;
}
