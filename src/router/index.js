import {createRouter, createWebHashHistory } from "vue-router"
import Home from "../pages/Home.vue"
import Politic from "../pages/Politic.vue"

const routes = [
    {
        path:'/',
        name:'Home',
        component: Home
    },
    {
        path:'/politic',
        name:'Politic',
        component: Politic
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router