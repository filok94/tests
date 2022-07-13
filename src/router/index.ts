import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
} from "vue-router";
import OneAuthPage from "../pages/OneAuthPage.vue";
import MainPage from "../pages/OneMainPage.vue";
import OneGame from "../pages/OneGame.vue";

import Conclusion from "../pages/OneTestConclusion.vue";
import Avatar from "../pages/OneAvatar.vue";
import CLientError from "../pages/OneCLientError.vue";
import Trigger from "../pages/OneTrigger.vue";
import TriggerGame from "../pages/OneTriggerGame.vue";
import TriggerConclusion from "../pages/OneTriggerConclusion.vue";
import OneRegWindowVue from "../pages/OneSigninUpModal.vue";
import { USER_STORAGE } from "../api/auth/auth.interfaces";

export const ROUTER_NAMES = {
  redirect: "redirect",
  login: {
    root: "Login",
    sign_in: "Sign_in",
    sign_up: "Sign_up",
  },
  main: "MainPage",
  test: {
    root: "Test",
    testBlock: "TestBlock",
    conclusion: "Conclusion",
  },
  trigger: {
    root: "Trigger",
    game: "TriggerGame",
    conclusion: "TriggerConclusion",
  },
  avatar: "Avatar",
  clientError: "ClientError",
} as const;
// eslint-disable-next-line no-redeclare
export type ROUTER_NAMES = typeof ROUTER_NAMES[keyof typeof ROUTER_NAMES];

const routes = [
  {
    path: "/",
    name: ROUTER_NAMES.redirect,
    redirect: {
      name: ROUTER_NAMES.main,
      params: {
        userId: window.localStorage.getItem("user")
          ? window.localStorage.getItem("user")
          : "noneAuth",
      },
      component: MainPage,
      meta: { requireAuth: true },
    },
  },
  {
    path: "/login",
    name: ROUTER_NAMES.login.root,
    component: OneAuthPage,
    children: [
      {
        name: ROUTER_NAMES.login.sign_in,
        path: "sign_in",
        component: OneRegWindowVue,
      },
      {
        name: ROUTER_NAMES.login.sign_up,
        path: "sign_up",
        component: OneRegWindowVue,
      },
    ],
  },
  {
    path: "/:userId/profile",
    name: ROUTER_NAMES.main,
    component: MainPage,
    meta: { requireAuth: true },
  },
  {
    path: "/:gameTitle",
    name: ROUTER_NAMES.test.root,
    component: OneGame,
    meta: { requireAuth: true },
    query: "",
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: Function
    ) => {
      if (
        (Number(to.query.step) != 1 || !to.query.step) &&
        to.name != ROUTER_NAMES.test.conclusion
      ) {
        next({
          name: ROUTER_NAMES.test.root,
          params: { gameTitle: to.params.gameTitle },
          query: { step: 1 },
        });
      } else {
        next();
      }
    },
    children: [
      {
        path: "conclusion",
        name: ROUTER_NAMES.test.conclusion,
        component: Conclusion,
        meta: { requireAuth: true },
      },
    ],
  },
  {
    path: "/:userId/trigger",
    name: ROUTER_NAMES.trigger.root,
    component: Trigger,
    meta: { requireAuth: true },
    children: [
      {
        path: "game",
        name: ROUTER_NAMES.trigger.game,
        component: TriggerGame,
        meta: { requireAuth: true },
      },
      {
        path: "conclusion",
        name: ROUTER_NAMES.trigger.conclusion,
        component: TriggerConclusion,
        meta: { requireAuth: true },
      },
    ],
  },
  {
    path: "/:userId/avatar",
    name: ROUTER_NAMES.avatar,
    component: Avatar,
    meta: { requireAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: ROUTER_NAMES.clientError,
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
