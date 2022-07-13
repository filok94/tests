import {
  gameControllerInstance,
  GAME_URLS,
  IGetAllGamesResponse,
  IGetQuestionsResponse,
  IGameIdParam,
} from "./games.api.interfaces";

export async function getAllGames(): Promise<
  IGetAllGamesResponse[] | undefined
> {
  try {
    const response = await gameControllerInstance.get<IGetAllGamesResponse[]>(
      GAME_URLS.get_all
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function getGameQusetions(params: IGameIdParam) {
  try {
    const response = await gameControllerInstance.get<IGetQuestionsResponse[]>(
      GAME_URLS.get_questions,
      { params: { game_id: params.game_id } }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
