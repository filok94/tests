import { getDatabase, onValue, ref as fireRef } from "firebase/database";

const state = {
  games: null,
  gamesResults: null,
  avatar: null,
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
  }
}

export default {
  state,
  mutations,
  actions
}
