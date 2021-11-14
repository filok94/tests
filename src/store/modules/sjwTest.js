import { getDatabase, onValue, set, ref as fireRef } from 'firebase/database'

const state = {
    questions: [
    ],
    userAnswers: [],
    person: null
}

const mutations = {
    СHOOSE_QUESTION(state, payload) {
        let isRight = payload.answer == state.questions[payload.number].rightAnswer
        state.userAnswers.push({ answerIs: payload.answer, isRight })
    },
    GET_QUESTIONS(state, payload) {
        state.questions = payload
        state.isLoaded = true
    },
    GET_PERSON(state, payload) {
        state.person = payload
    },
    GET_RESULTS(state, payload) {
        state.userAnswers = payload
    },
    CLEAN_SJW(state) {
        state.questions = null
    }
}

const actions = {
    async getInfoFromServer({ commit }, context) {
        let db = getDatabase()
        const question = fireRef(db, `global/sjw-test`);
        onValue(question, async (snapshot) => {
            try {
                const data = await snapshot.val();
                await commit('GET_QUESTIONS', data)
            } catch (err) {
                console.log("Error is " + err);
            }
        });
    },
    async getFinalPerson({ commit, getters, state }) {
        const db = getDatabase()
        const userId = window.localStorage.getItem('isAuthedById')
        const results = fireRef(db, `users/${userId}/SJW_result`);
        try {
            onValue(results, async (snapshot) => {
                let resultData = await snapshot.val()
                await commit('GET_RESULTS', resultData)
                let person = fireRef(db, `global/sjw-results/${getters.computedFinalPerson}`);
                onValue(person, async (snapshot) => {
                    let personData = await snapshot.val()
                    await commit('GET_PERSON', personData)
                })
            })
        } catch (err) {
            console.log(err);
        }
    }
}
const getters = {
    computedFinalPerson: (state) => state.userAnswers.filter((e) => e.isRight).length
}


export default {
    state,
    mutations,
    actions,
    getters
}