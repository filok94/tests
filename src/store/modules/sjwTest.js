import { getDatabase, onValue, set, ref as fireRef } from 'firebase/database'

const state = {
    questions: [
    ],
    userAnswers: [],
    person: null,
    allPersons: null,
}

const mutations = {
    СHOOSE_QUESTION(state, payload) {
        let isRight = payload.answer == state.questions[payload.number].rightAnswer
        state.userAnswers.push({ answerIs: payload.answer, isRight })
    },
    GET_QUESTIONS(state, payload) {
        state.questions = payload
    },
    GET_PERSON(state, payload) {
        state.person = payload
    },
    GET_ALL_PERSONS(state, payload) {
        state.allPersons = payload
    },
    GET_RESULTS(state, payload) {
        state.userAnswers = payload
    },
    CLEAN_SJW(state) {
        state.questions = null
    }
}

const actions = {
    async getQusetions({ commit }) {
        let db = getDatabase()
        const question = fireRef(db, `global/sjw-test`);
        onValue(question, async (snapshot) => {
            try {
                const data = await snapshot.val();
                await commit('GET_QUESTIONS', data)
            } catch (err) {
                console.error(err);
            }
        });
    },
    async getAllPersons({ commit }) {
        let db = getDatabase()
        const persons = fireRef(db, `global/sjw-results`);
        try {
            onValue(persons, async (snapshot) => {
                const personsData = await snapshot.val()
                await commit('GET_ALL_PERSONS', personsData)
            })
        } catch (err) {
            console.error(err)
        }
    },
    async getFinalPerson({ commit }) {
        const db = getDatabase()
        const userId = window.localStorage.getItem('isAuthedById')
        const person = fireRef(db, `users/${userId}/SJW_result/person`)
        try {
            onValue(person, async (snapshot) => {
                let personData = await snapshot.val()
                await commit('GET_PERSON', personData)
            })
        } catch (err) {
            console.error(err);
        }
    },
    async getUserResults({ commit }) {
        const db = getDatabase()
        const userId = window.localStorage.getItem('isAuthedById')
        const results = fireRef(db, `users/${userId}/SJW_result/answers/`)
        try {
            onValue(results, async (snapshot) => {
                let resultData = await snapshot.val()
                await commit("GET_RESULTS", resultData)
            })
        } catch (err) {
            console.error(err)
        }
    }
}

const getters = {
    computedFinalPerson: (state) => {
        let rightCount = state.userAnswers.filter((e) => e.isRight).length
        let computedFinalPerson = state.allPersons[rightCount]
        return computedFinalPerson
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}