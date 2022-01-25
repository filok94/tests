import { createRouter, createWebHistory } from "vue-router"
import RegAndAuth from "../pages/RegAndAuth.vue"
import SJW from "../pages/SJW.vue"
import User from "../pages/User.vue"
import SJWQuestion from "../pages/SJWQuestion.vue"
import Conclusion from '../pages/TestConclusion.vue'
import Avatar from "../pages/Avatar.vue"
import CLientError from "../pages/CLientError.vue"
import Trigger from '../pages/Trigger.vue'
import TriggerGame from '../pages/TriggerGame.vue'
import TriggerConclusion from '../pages/TriggerConclusion.vue'
const routes = [{
    path: "/",
    name: "redirect",
    redirect: {
        name: "User", params: { userName: window.localStorage.getItem('isAuthedBy') ? window.localStorage.getItem('isAuthedBy') : 'noneAuth' },
        component: User,
        meta: { requireAuth: true }
    }
},
{
    path: '/login',
    name: 'Home',
    component: RegAndAuth,
},
{
    path: '/:userName/profile',
    name: 'User',
    component: User,
    meta: { requireAuth: true },
},
{
    path: '/:userName/SJW',
    name: 'SJW',
    component: SJW,
    meta: { requireAuth: true },
    children: [{
        path: ':step(\[1-8])',
        name: 'sjw-question',
        component: SJWQuestion,
        meta: { requireAuth: true, questionsCount: 8 },
        beforeEnter: (to, from, next) => {
            if (Number(to.params.step) != 1) {
                next({ name: 'sjw-question', params: { userName: window.localStorage.getItem('isAuthedBy'), step: 1 } })
            } else {
                next()
            }
        }
    }, {
        path: 'conclusion',
        name: "Conclusion",
        component: Conclusion,
        meta: { requireAuth: true }
    }]
},
{
    path: '/:userName/trigger',
    name: 'trigger',
    component: Trigger,
    meta: { requireAuth: true },
    children: [
        {
            path: 'game',
            name: 'TriggerGame',
            component: TriggerGame,
            meta: { requireAuth: true },

        },
        {
            path: 'conclusion',
            name: 'TriggerConclusion',
            component: TriggerConclusion,
            meta: { requireAuth: true },

        }
    ]

},
{
    path: '/:userName/avatar',
    name: 'Avatar',
    component: Avatar,
    meta: { requireAuth: true }
},
{
    path: '/:pathMatch(.*)*',
    name: 'ClientError',
    component: CLientError
}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    const requireAuth = to.matched.some(record => record.meta.requireAuth);
    const isAuthed = JSON.parse(window.localStorage.getItem('isAuthed'))
    if (requireAuth && !isAuthed) {
        next('/login');
    } else {
        next();
    }
})
export default router