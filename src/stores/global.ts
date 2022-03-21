import { defineStore } from "pinia";
import { getDatabase, onValue, ref as fireRef } from "firebase/database";
import { PersonType } from "../types/testsTypes.interface";

interface GameBannerType {
  firstStep: number,
  id: number,
  img: string,
  linkToPerson: string,
  route: string,
  routeToConclusion: string,
  subtitle: string,
  title: string
}

interface AvatarOptionType {
  name: string,
  options: {
    [index: string]: string[] | number[]
  }
}

interface State {
  finalPersonsList: null | Array<PersonType>,
  games: null | Array<GameBannerType>,
  avatar: null | AvatarOptionType,
  avatarImage: null | string,
  avatarImageDefault: string
}

export const useGlobal = defineStore('global', {
  state: (): State => {
    return {
      finalPersonsList: null,
      games: null,
      avatar: null,
      avatarImage: null,
      avatarImageDefault: "https://avatars.dicebear.com/api/pixel-art/:seed.svg"
    }
  },
  actions: {
    async getPersonNamesToTestDescription(link: string) {
      const db = getDatabase()
      let userId = window.localStorage.getItem("isAuthedById")
      let person = fireRef(db, `users/${userId}/${link}`)
      onValue(person, async (snapshot) => {
        try {
          const personData: PersonType = await snapshot.val()
          this.finalPersonsList == null
            ? this.finalPersonsList = [personData]
            :
            this.finalPersonsList?.push(personData)
        } catch (err) {
          console.error(err);
        }
      })
    },
    async getGames() {
      const db = getDatabase();
      const games = fireRef(db, "global/test-list");
      onValue(games, async (snapshot) => {
        try {
          const gamesData = await snapshot.val();
          for (let game of gamesData) {
            await this.getPersonNamesToTestDescription(game.linkToPerson)
          }
          this.games = gamesData
        } catch (error: any) {
          console.error(error.message)
        }
      })
    },
    async getAvatars() {
      const db = getDatabase()
      const avatar = fireRef(db, "global/avatar")
      try {
        onValue(avatar, async (snapshot) => {
          const avatarData: AvatarOptionType = await snapshot.val()
          this.avatar = avatarData
        })
      } catch (err) {
        console.error(err);
      }
    },
    async getAvatarImageForCircle() {
      const db = getDatabase()
      let userId = window.localStorage.getItem("isAuthedById");
      const avatar = fireRef(db, `users/${userId}/avatar`)
      onValue(avatar, async (snapshot) => {
        try {
          const avatarData: string = await snapshot.val()
          this.avatarImage = avatarData
        } catch (err) {
          console.error(err);
        }
      })
    }
  }
})