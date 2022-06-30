import { useAxios } from "@vueuse/integrations/useAxios";
import {
  gameControllerInstance,
  GAME_URLS,
  IGetAllGamesResponse,
} from "./games.intrfaces";

export function useGetAllGames() {
  const { data, error, execute, isLoading } = useAxios<IGetAllGamesResponse[]>(
    GAME_URLS.get_all,
    {
      method: "GET",
    },
    gameControllerInstance,
    { immediate: false }
  );

  return { data, error, execute, isLoading };
}
