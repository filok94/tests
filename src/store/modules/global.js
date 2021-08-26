const state = {
    user: '',
    auth: false,
    banners: [{
        id:1,
        img: '',
        title: 'SJW',
        subtitle: 'Тест о СЖВ героях нашего времени',
        route: 'QuestionNumber',
        questionId: '1'
    },{
        id:2,
        img: '',
        title: 'Политический',
        subtitle: 'Тест о самых честных людях земли',
        route:'Politic',
        questionId: '1'
    }
]
}

const mutations = {
    submitUserName(state, newName) {
        state.user = newName,
        state.auth = true
    }
}

export default {
    state,
    mutations
}