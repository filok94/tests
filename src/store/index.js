import { createStore } from 'vuex'
import sjw from './modules/sjwTest'
import politic from './modules/politic'
import global from './modules/global'


export default createStore({
    modules: {
        sjw,
        politic,
        global
    },
})