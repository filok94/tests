import {createRouter, createWebHistory } from "vue-router"
import Home from "../pages/Home.vue"
import SJW from "../pages/SJW.vue"
import User from "../pages/User.vue"
import auth from '../store/modules/global'
import CurrentQuestion from "../pages/CurrentQuestion.vue"

const routes = [
    {
        path:'/',
        name:'Home',
        component: Home,
    },
    {
        path: '/:userName',
        name: 'User',
        component: User,
        beforeEnter: (to, from, next) => {
            if (auth.state.auth){
                next()
            } else {
                next({name: 'Home'})
            }
        }
    },
    {
        path:'/:userName/SJW',
        name:'SJW',
        component: SJW,
        children: [
            {
                path: '/:userName/SJW/:questionNumber',
                name: 'QuestionNumber',
                component: CurrentQuestion
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router