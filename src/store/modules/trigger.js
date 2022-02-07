import { getDatabase, onValue, set, ref as fireRef } from 'firebase/database'

const state = {
    warriorCards: [],
    triggerQuestions: [],
    triggerConclusionPersons: [],
    activeTriggerCardIs: null,
    permanentAnswers: [],
    triggerAnswersResults: [null, null, null]
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
    }
}

const actions = {
    async getTriggerGame({ commit }) {
        let db = getDatabase()
        const triggerInfo = fireRef(db, 'global/trigger')
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
        const triggerConclusion = fireRef(db, 'global/trigger-conclusion')
        onValue(triggerConclusion, async (snapshot) => {
            try {
                const data = await snapshot.val();
                await commit("GET_TRIGGER_CONCLUSION", data.questions)
            } catch (err) {
                console.error(err);
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