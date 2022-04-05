import { defineStore } from 'pinia'
import { getDatabase, onValue, set, ref as fireRef } from 'firebase/database'
import { PersonType, ChooseSjwAnswer } from "../types/testsTypes.interface";

interface QuestionType {
    afterAnswer: string,
    answers: string[],
    question: string,
    rightAnswer: number
}

interface UserAnswerType {
    answerIs: number,
    isRight: boolean
}

interface SjwState {
    questions: QuestionType[],
    userAnswers: UserAnswerType[],
    person: PersonType | null,
    allPersons: PersonType[] | null,
}

export const useSjwStore = defineStore('sjwStore', {
    state: (): SjwState => {
        return {
            questions: [],
            userAnswers: [],
            person: null,
            allPersons: null
        }
    },
    actions: {
        chooseQuestion(payload: ChooseSjwAnswer) {
            let isRight = payload.answer == this.questions[payload.number].rightAnswer
            this.userAnswers.push({ answerIs: payload.answer, isRight })
        },
        async getQusetions() {
            let db = getDatabase()
            const question = fireRef(db, `global/sjw-test`);
            onValue(question, async (snapshot) => {
                try {
                    const data: QuestionType[] = await snapshot.val();
                    this.questions = data
                } catch (err) {
                    console.error(err);
                }
            })
        },
        async getAllPersons() {
            let db = getDatabase()
            const persons = fireRef(db, `global/sjw-results`);
            try {
                onValue(persons, async (snapshot) => {
                    const personsData: PersonType[] = await snapshot.val()
                    this.allPersons = personsData
                })
            } catch (err) {
                console.error(err)
            }
        },
        async getFinalPerson() {
            const db = getDatabase()
            const userId = window.localStorage.getItem('isAuthedById')
            const person = fireRef(db, `users/${userId}/SJW_result/person`)
            try {
                onValue(person, async (snapshot) => {
                    let personData: PersonType = await snapshot.val()
                    this.person = personData
                })
            } catch (err) {
                console.error(err);
            }
        },
        async getUserResults() {
            const db = getDatabase()
            const userId = window.localStorage.getItem('isAuthedById')
            const results = fireRef(db, `users/${userId}/SJW_result/answers/`)
            try {
                onValue(results, async (snapshot) => {
                    let resultData: UserAnswerType[] = await snapshot.val()
                    this.userAnswers = resultData
                })
            } catch (err) {
                console.error(err)
            }
        }
    },
    getters: {
        computedFinalPerson: (state): PersonType | null => {
            let rightCount = state.userAnswers.filter((e) => e.isRight).length
            let computedFinalPerson = state.allPersons ? state.allPersons[rightCount] : null
            return computedFinalPerson
        }
    }
})
