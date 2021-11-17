import { async } from "@firebase/util";
import { getDatabase, onValue, ref as fireRef } from "firebase/database";

const state = {
    games: null,
    gamesResults: null,
    avatars: null,

    choosenOptions: [{
        uri: '',
        value: ''
    },
    {
        uri: '',
        value: ''
    },
    {
        uri: '',
        value: ''
    },
    {
        uri: '',
        value: ''
    },
    {
        uri: '',
        value: ''
    },
    {
        uri: '',
        value: ''
    },
    {
        uri: '',
        value: ''
    }
    ]
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
        state.avatars = payload
    }
}
const actions = {
    async getGames({ commit, state }) {
        const db = getDatabase();
        const games = fireRef(db, "global/test-list");
        const arrayWithGamesResults = []
        onValue(games, async (snapshot) => {
            try {
                const gamesData = await snapshot.val();
                await commit('GET_GAMES', gamesData)
            } catch (error) {
                console.error(error.message);
            }
        })
    },
    async getAvatars({ commit }) {
        const db = getDatabase();
        const avatars = fireRef(db, "global/avatars");
        try {
            onValue(avatars, async (snapshot) => {
                const avatarsData = await snapshot.val()
                await commit("GET_AVATARS", avatarsData)
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