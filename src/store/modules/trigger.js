const state = {
    warriorCards: [
        {
            id: 0,
            name: 'Интерсек',
            imageUrl: 'https://avatars.dicebear.com/api/micah/:seed.svg?mouth=nervous&eyebrows=eyelashesDown&hair=pixie&eyes=eyesShadow&nose=tound&ears=detached&shirt=crew&earrings=hoop&earringsProbability=100&glassesProbability=0&facialHairProbability=0&baseColor=calm&eyeShadowColor=lavender&eyebrowColor=mellow&hairColor=apricot&shirtColor=topaz',

        },
        {
            id: 1,
            name: 'Радфем',
            imageUrl: 'https://avatars.dicebear.com/api/open-peeps/:seed.svg?head=shaved2&face=veryAngry&facialHairProbability=0&maskProbability=0&accessoriesProbability=100&accessories=glasses2&skinColor=variant02&hairColor=variant03',
        },
        {
            id: 2,
            name: 'Либфем',
            imageUrl: 'https://avatars.dicebear.com/api/big-smile/:seed.svg?mouth=openSad&eyes=angry&hair=bunHair&accessoriesProbability=0&hairColor=variant06'
        },
    ],
    activeTriggerCardIs: null,
    triggerQuestions: [
        {
            question: "lambda",
            answer: 0
        },
        {
            question: "lambda1",
            answer: 1
        },
        {
            question: "lambda2",
            answer: 0
        },
        {
            question: "lambda3",
            answer: 1
        },
        {
            question: "lambda4",
            answer: 0
        },
    ],
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
    }
}

export default {
    state,
    mutations,
    // getters,
    // actions,
}