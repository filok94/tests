const state = {
    name: 'Phil',
    age: 15
}

const mutations = {
    changeEverything(state, newName) {
        state.age = state.age+newName[1],
        state.name = newName[0]
    }
}

export default {
    state,
    mutations
}