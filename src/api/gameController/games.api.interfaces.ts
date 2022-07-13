import axios, { AxiosError } from "axios";
import { USER_STORAGE } from "../auth/auth.interfaces";
import {
  onResponeClearRetries,
  onResponeRefreshInstanceToken,
} from "../refreshInstanceToken";

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
  async (r) => {
    onResponeClearRetries(r);
    return r;
  },
  async (e: AxiosError) =>
    onResponeRefreshInstanceToken(gameControllerInstance, e)
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
  description: string;
  persons: string[];
  link: string;
}

export interface IGetQuestionsResponse {
  question: string;
  answers: string[];
  index: number;
}

export interface IGameIdParam {
  game_id: string;
}
