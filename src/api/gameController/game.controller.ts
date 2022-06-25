import axios from "axios";
import { authInstance, refreshTokens } from "../auth/api.auth";

export const gameController = axios.create({
  baseURL: `${import.meta.env.VITE_GAMES_URL}`,
  headers: {
    token: JSON.parse(localStorage.getItem("access_token")),
  },
});
const urls = {
  get_all: "get_all",
  get_by_id: "get_by_id",
  calculate: "calculate",
  get_result: "get_result",
};
authInstance.interceptors.response.use(
  (response) => {
    if (response.status == 401) {
      const { token } = String(localStorage.getItem("refresh_token");
      refreshTokens({ ...token });
    }
    if (response != undefined) return response;
  },
  (err) => {
    throw new Error(err.message);
  }
);

export async function getAllGames() {
  const response = await gameController.get(urls.get_all);
}
