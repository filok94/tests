import { createStore } from 'vuex'
import sjw from './modules/sjwTest'
import trigger from './modules/trigger'
import global from './modules/global'


export default createStore({
    modules: {
        sjw,
        trigger,
        global
    },
})