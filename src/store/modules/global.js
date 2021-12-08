import { getDatabase, onValue, ref as fireRef } from "firebase/database";

const state = {
  games: null,
  gamesResults: null,
  avatar: null,
  avatarImage: null,
  avatarImageDefault: "https://avatars.dicebear.com/api/pixel-art/:seed.svg"
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
  }
}
const actions = {
  async getGames({ commit, state }) {
    const db = getDatabase();
    const games = fireRef(db, "global/test-list");
    onValue(games, async (snapshot) => {
      try {
        const gamesData = await snapshot.val();
        await commit('GET_GAMES', gamesData)
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
  }
}

export default {
  state,
  mutations,
  actions
}
