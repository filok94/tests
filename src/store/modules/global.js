import { getDatabase, onValue, ref as fireRef } from "firebase/database";

const state = {
  finalPersonsList: null,
  games: null,
  gamesResults: null,
  avatar: null,
  avatarImage: null,
  avatarImageDefault: "https://avatars.dicebear.com/api/pixel-art/:seed.svg",
}

const mutations = {
  changeChoosenOptions(state, payload) {
    state.choosenOptions[payload[2]].uri = payload[0]
    state.choosenOptions[payload[2]].value = payload[1]
  },
  GET_GAMES(state, payload) {
    state.games = payload
  },
  GET_AVATARS(state, payload) {
    state.avatar = payload
  },
  GET_AVATAR_IMAGE(state, payload) {
    state.avatarImage = payload
  },
  GET_PERSONS_LIST(state, payload) {
    state.finalPersonsList = payload
  }
}
const actions = {
  async getGames({ commit, dispatch }) {
    const db = getDatabase();
    const games = fireRef(db, "global/test-list");
    onValue(games, async (snapshot) => {
      try {
        const gamesData = await snapshot.val();
        await commit('GET_GAMES', gamesData)
        await dispatch("getPersonNamesToTestDescription", gamesData)
      } catch (error) {
        console.error(error.message)
      }
    })
  },
  async getAvatars({ commit }) {
    const db = getDatabase()
    const avatar = fireRef(db, "global/avatar")
    try {
      onValue(avatar, async (snapshot) => {
        const avatarData = await snapshot.val()
        await commit("GET_AVATARS", avatarData)
      })
    } catch (err) {
      console.error(err);
    }
  },
  async getAvatarImageForCircle({ commit }) {
    const db = getDatabase()
    let userId = window.localStorage.getItem("isAuthedById");
    const avatar = fireRef(db, `users/${userId}/avatar`)
    try {
      onValue(avatar, async (snapshot) => {
        const avatarData = await snapshot.val()
        await commit("GET_AVATAR_IMAGE", avatarData)
      })
    } catch (err) {
      console.error(err);
    }
  },
  async getPersonNamesToTestDescription({ commit, state }, games) {
    let arrayOfLinks = []
    for (let i of state.games) {
      arrayOfLinks.push(i.linkToPerson)
    }
    let arrayOfPersons = []
    const db = getDatabase()
    let userId = window.localStorage.getItem("isAuthedById")
    for (let link of arrayOfLinks) {
      let person = fireRef(db, `users/${userId}/${link}`)
      try {
        onValue(person, async (snapshot) => {
          const personData = await snapshot.val()
          arrayOfPersons.push(personData)
        })
      } catch (err) {
        console.error(err);
      }
    }
    commit("GET_PERSONS_LIST", arrayOfPersons)
  }
}

export default {
  state,
  mutations,
  actions
}
