import { async } from '@firebase/util';
import { getDatabase, onValue, set, ref as fireRef } from 'firebase/database'
let userId = window.localStorage.getItem("isAuthedById");
let pathes = {
    toTrigger: 'global/trigger',
    toTriggerConclusion: 'global/trigger-conclusion',
    toUserTriggerPerson: `users/${userId}/Trigger_result/person`,
    toUserTriggerAnswers: `users/${userId}/Trigger_result/answers`,
    toUserTriggerTestEnded: `users/${userId}/Trigger_result/isEnded`
}
const state = {
    warriorCards: [],
    triggerQuestions: [],
    triggerConclusionPersons: [],
    activeTriggerCardIs: null,
    permanentAnswers: [],
    triggerAnswersResults: [null, null, null],
    person: null,
    wasTestEnded: false
}

const mutations = {
    COMPUTE_ANSWERS(state, payload) {
        let rightAnswersCount = state.permanentAnswers.filter(e => e == true).length
        payload != null ? state.triggerAnswersResults[payload] = rightAnswersCount : null
        state.permanentAnswers = []

    },
    PUSH_PERMANENT_ANSWER(state, payload) {
        state.permanentAnswers.push(payload)
    },
    GET_TRIGGER_QUESTIONS(state, payload) {
        state.triggerQuestions = payload
    },
    GET_TRIGGER_CARDS(state, payload) {
        state.warriorCards = payload
    },
    GET_TRIGGER_CONCLUSION(state, payload) {
        state.triggerConclusionPersons = payload
    },
    SET_PERSON(state, payload) {
        state.person = payload
    },
    GET_ANSWERS(state, payload) {
        state.triggerAnswersResults = payload
    },
    GET_ENDED_TEST(state, payload) {
        state.wasTestEnded = payload
    }
}

const actions = {
    async getTriggerGame({ commit }) {
        let db = getDatabase()
        const triggerInfo = fireRef(db, pathes.toTrigger)
        onValue(triggerInfo, async (snapshot) => {
            try {
                const data = await snapshot.val();
                await commit("GET_TRIGGER_QUESTIONS", data.questions)
                await commit("GET_TRIGGER_CARDS", data.card)
            } catch (err) {
                console.error(err);
            }
        })
    },
    async getTriggerConclusion({ commit }) {
        let db = getDatabase()
        const triggerConclusion = fireRef(db, pathes.toTriggerConclusion)
        onValue(triggerConclusion, async (snapshot) => {
            try {
                const data = await snapshot.val();
                await commit("GET_TRIGGER_CONCLUSION", data)
            } catch (err) {
                console.error(err);
            }
        })
    },
    async postResults({ state }) {
        let db = getDatabase()
        try {
            await set(fireRef(db, pathes.toUserTriggerPerson), state.person);
            await set(fireRef(db, pathes.toUserTriggerAnswers), state.triggerAnswersResults);
            await set(fireRef(db, pathes.toUserTriggerTestEnded), true);
        } catch (err) {
            console.error(err)
        }
    },
    async getCurrentUserResults({ commit }) {
        let db = getDatabase()
        onValue(fireRef(db, pathes.toUserTriggerAnswers), async (snapshot) => {
            try {
                const data = await snapshot.val();
                await commit("GET_ANSWERS", data)
            } catch (err) {
                console.error(err)
            }
        })
    },
    async getIfTheTestWasEnded({ commit }) {
        let db = getDatabase()
        let wasTestEnded = fireRef(db, pathes.toUserTriggerTestEnded)
        onValue(wasTestEnded, async (snapshot) => {
            try {
                const data = await snapshot.val();
                await commit("GET_ENDED_TEST", data)
            } catch (err) {
                console.error(err)
            }
        })
    }
}

export default {
    state,
    mutations,
    // getters,
    actions,
}