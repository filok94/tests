import { createRouter, createWebHistory } from "vue-router"
import Home from "../pages/Home.vue"
import SJW from "../pages/SJW.vue"
import User from "../pages/User.vue"
import CurrentQuestion from "../pages/CurrentQuestion.vue"
import Conclusion from '../pages/TestConclusion.vue'
import Avatar from "../pages/Avatar.vue"
import auth from '../store/modules/global'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/:userName',
        name: 'User',
        component: User,
        beforeEnter: (to, from, next) => {
            if (auth.state.auth) {
                next()
            } else {
                next({ name: 'Home' })
            }
        }
    },
    {
        path: '/:userName/SJW',
        name: 'SJW',
        component: SJW,
        children: [
            {
                path: '/:userName/SJW/:questionNumber',
                name: 'QuestionNumber',
                component: CurrentQuestion
            }
        ]
    },
    {
        path: '/:userName/SJW/conclusion',
        name: "Conclusion",
        component: Conclusion
    },
    {
        path: '/:userName/avatar',
        name: 'Avatar',
        component: Avatar
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router