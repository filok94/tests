import { getDatabase, onValue, ref as fireRef } from "firebase/database";

const state = {
    user: '',
    email: '',
    isAuthed: false,
    games: null,
    gamesResults: null,

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
    GET_USER_RESULTS(state, payload) {
        state.gamesResults = payload
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
                await state.games.forEach((e, index) => {
                    const results = fireRef(db, `users/${window.localStorage.getItem('isAuthedById')}/${state.games[index].title}_result`)
                    onValue(results, async (snapshot) => {
                        const resultsData = await snapshot.val();
                        arrayWithGamesResults.push(resultsData)
                        console.log(resultsData);
                    })
                })
                await commit('GET_USER_RESULTS', arrayWithGamesResults)
            } catch (error) {
                console.error(error.message);
            }
        })
    },
    async getUserResults({ commit }, context) {

        const db = getDatabase();
        context.forEeach(e => {
            const result = fireRef(db, `global/users/${window.localStorage.getItem('isAuthedById')}/${e}_result`)
            onValue(result, async (snapshot) => {
                try {
                    const data = await snapshot.val();
                    arrayWithGamesResults.push(data)
                } catch (error) {
                    arrayWithGamesResults.push(err.message)
                    console.error(error.code);
                }
                await commit('GET_GAMES', data)
            });
        })
    }
}

export default {
    state,
    mutations,
    actions
}