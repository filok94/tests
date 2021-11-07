const state = {
    user: '',
    email: '',
    isAuthed: false,
    games: [],

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
    }
}
const actions = {
    async getGames({ commit }, context) {
        commit('GET_GAMES', context)
    }
}

export default {
    state,
    mutations,
    actions
}