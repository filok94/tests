import {
  IGetAllGamesResponse,
  IGetQuestionsResponse,
} from "../api/gameController/games.api.interfaces";
import { defineStore } from "pinia";
import { getAllGames, getGameQusetions } from "../api/gameController/games.api";
import { IAnswersList, Nullable } from "../types/testsTypes.interface";

interface GamesState {
  games: Nullable<IGetAllGamesResponse[]>;
  activeGame: Nullable<{
    id: string;
    title: string;
    questions: Nullable<IGetQuestionsResponse[]>;
  }>;
  anserwsList: IAnswersList[];
}

export const useGamesStore = defineStore("games", {
  state: (): GamesState => {
    return {
      games: null,
      activeGame: null,
      anserwsList: [],
    };
  },
  actions: {
    async setActiveGame(gameName: string) {
      const activeGame = this.games?.filter((e) => e.title == gameName)[0];
      if (activeGame) {
        const questions = await getGameQusetions({ game_id: activeGame._id });
        this.activeGame = {
          id: activeGame._id,
          title: activeGame.title,
          questions,
        };
      }
    },
    async getAllGames() {
      this.games = await getAllGames();
    },

    pushAnswerToList(param: IAnswersList) {
      this.anserwsList.push(param);
    },
  },
});
