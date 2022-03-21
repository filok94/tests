import { defineStore } from "pinia";
import { getDatabase, onValue, set, ref as fireRef } from 'firebase/database'
import { WarriorCardType, TriggerPerson } from "../types/testsTypes.interface";
let userId = window.localStorage.getItem("isAuthedById");
let pathes = {
    toTrigger: 'global/trigger',
    toTriggerConclusion: 'global/trigger-conclusion',
    toUserTriggerPerson: `users/${userId}/Trigger_result/person`,
    toUserTriggerAnswers: `users/${userId}/Trigger_result/answers`,
    toUserTriggerTestEnded: `users/${userId}/Trigger_result/isEnded`
}

interface TriggerState {
    warriorCards: WarriorCardType[],
    triggerQuestions: string[],
    triggerConclusionPersons: TriggerPerson[]
    activeTriggerCardIs: WarriorCardType,
    permanentAnswers: boolean[],
    triggerAnswersResults: number[],
    person: TriggerPerson | null
    wasTestEnded: boolean
}

export const useTriggerStore = defineStore('triggerStore', {
    state: (): TriggerState => {
        return {
            warriorCards: [],
            triggerQuestions: [],
            triggerConclusionPersons: [],
            activeTriggerCardIs: {
                answers: [0],
                id: 0,
                imageUrl: '',
                name: ''
            },
            permanentAnswers: [],
            triggerAnswersResults: [],
            person: null,
            wasTestEnded: false
        }
    },
    actions: {
        async getTriggerGame() {
            let db = getDatabase()
            const triggerInfo = fireRef(db, pathes.toTrigger)
            onValue(triggerInfo, async (snapshot) => {
                try {
                    const data = await snapshot.val();
                    this.triggerQuestions = data.questions
                    this.warriorCards = data.card
                    for (let card of this.warriorCards) {
                        this.triggerAnswersResults.push(0)
                    }
                } catch (err) {
                    console.error(err);
                }
            })
        },
        async getTriggerConclusion() {
            let db = getDatabase()
            const triggerConclusion = fireRef(db, pathes.toTriggerConclusion)
            onValue(triggerConclusion, async (snapshot) => {
                try {
                    const data = await snapshot.val();
                    this.triggerConclusionPersons = data
                } catch (err) {
                    console.error(err);
                }
            })
        },
        async postResults() {
            let db = getDatabase()
            try {
                await set(fireRef(db, pathes.toUserTriggerPerson), this.person);
                await set(fireRef(db, pathes.toUserTriggerAnswers), this.triggerAnswersResults);
                await set(fireRef(db, pathes.toUserTriggerTestEnded), true);
            } catch (err) {
                console.error(err)
            }
        },
        async getCurrentUserResults() {
            let db = getDatabase()
            onValue(fireRef(db, pathes.toUserTriggerAnswers), async (snapshot) => {
                try {
                    const data = await snapshot.val();
                    data !== null ? this.triggerAnswersResults = data : undefined
                } catch (err) {
                    console.error(err)
                }
            })
        },
        async getIfTheTestWasEnded() {
            let db = getDatabase()
            let wasTestEnded = fireRef(db, pathes.toUserTriggerTestEnded)
            onValue(wasTestEnded, async (snapshot) => {
                try {
                    const data = await snapshot.val();
                    this.wasTestEnded = data
                } catch (err) {
                    console.error(err)
                }
            })
        },
        computeAnswers(payload: number | null) {
            let rightAnswersCount = this.permanentAnswers.filter(e => e == true).length
            payload != null ?
                this.triggerAnswersResults[payload] = rightAnswersCount
                :
                null
            this.permanentAnswers = []
        }
    }
})