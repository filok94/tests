import {createStore} from 'vuex'
import sjw from './modules/sjwTest'
import politic from './modules/politic'

export default createStore({
    modules: {
        sjw,
        politic
    },

})