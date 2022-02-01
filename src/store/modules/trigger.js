const state = {
    warriorCards: [
        {
            id: 0,
            name: 'Интерсек',
            imageUrl: 'https://avatars.dicebear.com/api/micah/:seed.svg?mouth=nervous&eyebrows=eyelashesDown&hair=pixie&eyes=eyesShadow&nose=tound&ears=detached&shirt=crew&earrings=hoop&earringsProbability=100&glassesProbability=0&facialHairProbability=0&baseColor=calm&eyeShadowColor=lavender&eyebrowColor=mellow&hairColor=apricot&shirtColor=topaz',
            answers: [1, 0, 0, 0, 1, 1]

        },
        {
            id: 1,
            name: 'Радфем',
            imageUrl: 'https://avatars.dicebear.com/api/open-peeps/:seed.svg?head=shaved2&face=veryAngry&facialHairProbability=0&maskProbability=0&accessoriesProbability=100&accessories=glasses2&skinColor=variant02&hairColor=variant03',
            answers: [1, 1, 1, 1, 1, 0]
        },
        {
            id: 2,
            name: 'Либфем',
            imageUrl: 'https://avatars.dicebear.com/api/big-smile/:seed.svg?mouth=openSad&eyes=angry&hair=bunHair&accessoriesProbability=0&hairColor=variant06',
            answers: [0, 1, 1, 0, 0, 1]
        },
    ],
    triggerQuestions: [
        "Женщина состоит в браке с мужчиной в счастливом патриархальном браке",
        "На женскую вечеринку зашла трансгендер_ка",
        "Профеминист стоит вместе с девушками на феминистском марше",
        "Твиттер-феминистки из Барнаула озабочены проблемами национальных меньшинств в США",
        "Женщины и мужчины равны",
        "Женщина убила полицейского за то, что тот воспрепятствовал ее незаконной деятельности"
    ],
    triggerConclusionPersons: [
        {
            level: 0,
            title: "Wonderzine",
            description: "Вы никому неизвестная фемжурналист_ка, срочно пройдите курс по гендерстадиз!",
            image: '/persons/wonderzine.png',
            link: 'https://www.coursera.org/courses?query=gender%20studies'
        },
        {
            level: 1,
            title: "Дарья Серенко",
            description: "Вы много знаете о феминист_ках и можете открыть свои курсы гендерстадиз, но вы не признаны мэтр_кой феминизма",
            image: '/persons/serenko.png',
            link: 'https://ru.wikipedia.org/wiki/Серенко,_Дарья_Андреевна'
        },
        {
            level: 2,
            title: "Белла Рапопорт",
            description: "Ни одна феминист_ка на земле не знает о феменизме больше Вас! Вы - кладезь гендерстадиз!",
            image: '/persons/rapoport.jpg',
            link: 'https://vk.com/wall-115617244_737804'
        },
    ],
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
    }
}

export default {
    state,
    mutations,
    // getters,
    // actions,
}