import { createRouter, createWebHistory } from "vue-router"
import RegAndAuth from "../pages/RegAndAuth.vue"
import SJW from "../pages/SJW.vue"
import User from "../pages/User.vue"
import SJWQuestion from "../pages/SJWQuestion.vue"
import Conclusion from '../pages/TestConclusion.vue'
import Avatar from "../pages/Avatar.vue"
const routes = [{
        path: "/",
        name: "redirect",
        component: User,
        meta: { requireAuth: true }
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
            path: ':step',
            name: 'sjw-question',
            component: SJWQuestion,
        }, {
            path: 'conclusion',
            name: "Conclusion",
            component: Conclusion,
            meta: { requireAuth: true }
        }]
    },
    {
        path: '/:userName/avatar',
        name: 'Avatar',
        component: Avatar,
        meta: { requireAuth: true }
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
        console.log(requireAuth, isAuthed)
        next('/login');
    } else {
        console.log(requireAuth, isAuthed)
        next();
    }
})
export default router