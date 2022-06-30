import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
} from "vue-router";
import OneAuthPage from "../pages/OneAuthPage.vue";
import MainPage from "../pages/OneMainPage.vue";
import SJW from "../pages/OneSJW.vue";
import SJWQuestion from "../pages/OneSJWQuestion.vue";
import Conclusion from "../pages/OneTestConclusion.vue";
import Avatar from "../pages/OneAvatar.vue";
import CLientError from "../pages/OneCLientError.vue";
import Trigger from "../pages/OneTrigger.vue";
import TriggerGame from "../pages/OneTriggerGame.vue";
import TriggerConclusion from "../pages/OneTriggerConclusion.vue";
import OneRegWindowVue from "../pages/OneSigninUpModal.vue";
import { USER_STORAGE } from "../api/auth/auth.interfaces";
const routes = [
  {
    path: "/",
    name: "redirect",
    redirect: {
      name: "MainPage",
      params: {
        userName: window.localStorage.getItem("user")
          ? window.localStorage.getItem("user")
          : "noneAuth",
      },
      component: MainPage,
      meta: { requireAuth: true },
    },
  },
  {
    path: "/login",
    name: "Login",
    component: OneAuthPage,
    children: [
      {
        name: "Sign_in",
        path: "sign_in",
        component: OneRegWindowVue,
      },
      {
        name: "Sign_up",
        path: "sign_up",
        component: OneRegWindowVue,
      },
    ],
  },
  {
    path: "/:userName/profile",
    name: "MainPage",
    component: MainPage,
    meta: { requireAuth: true },
  },
  {
    path: "/:userName/SJW",
    name: "SJW",
    component: SJW,
    meta: { requireAuth: true },
    children: [
      {
        path: ":step([1-8])",
        name: "sjw-question",
        component: SJWQuestion,
        meta: { requireAuth: true, questionsCount: 8 },
        beforeEnter: (
          to: RouteLocationNormalized,
          from: RouteLocationNormalized,
          next: Function
        ) => {
          if (Number(to.params.step) != 1) {
            next({
              name: "sjw-question",
              params: {
                userName: window.localStorage.getItem("user"),
                step: 1,
              },
            });
          } else {
            next();
          }
        },
      },
      {
        path: "conclusion",
        name: "Conclusion",
        component: Conclusion,
        meta: { requireAuth: true },
      },
    ],
  },
  {
    path: "/:userName/trigger",
    name: "Trigger",
    component: Trigger,
    meta: { requireAuth: true },
    children: [
      {
        path: "game",
        name: "TriggerGame",
        component: TriggerGame,
        meta: { requireAuth: true },
      },
      {
        path: "conclusion",
        name: "TriggerConclusion",
        component: TriggerConclusion,
        meta: { requireAuth: true },
      },
    ],
  },
  {
    path: "/:userName/avatar",
    name: "Avatar",
    component: Avatar,
    meta: { requireAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "ClientError",
    component: CLientError,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some((record) => record.meta.requireAuth);
  const isAuthed =
    window.localStorage.getItem(USER_STORAGE.access_token) != undefined;
  if (requireAuth && !isAuthed) {
    next("/login");
  } else {
    next();
  }
});
export default router;
