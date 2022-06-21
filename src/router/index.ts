import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
} from "vue-router";
import RegAndAuth from "../pages/OneRegAndAuth.vue";
import SJW from "../pages/OneSJW.vue";
import User from "../pages/OneUser.vue";
import SJWQuestion from "../pages/OneSJWQuestion.vue";
import Conclusion from "../pages/OneTestConclusion.vue";
import Avatar from "../pages/OneAvatar.vue";
import CLientError from "../pages/OneCLientError.vue";
import Trigger from "../pages/OneTrigger.vue";
import TriggerGame from "../pages/OneTriggerGame.vue";
import TriggerConclusion from "../pages/OneTriggerConclusion.vue";
const routes = [
  {
    path: "/",
    name: "redirect",
    redirect: {
      name: "User",
      params: {
        userName: window.localStorage.getItem("isAuthedBy")
          ? window.localStorage.getItem("isAuthedBy")
          : "noneAuth",
      },
      component: User,
      meta: { requireAuth: true },
    },
  },
  {
    path: "/login",
    name: "Home",
    component: RegAndAuth,
  },
  {
    path: "/:userName/profile",
    name: "User",
    component: User,
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
                userName: window.localStorage.getItem("isAuthedBy"),
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
    name: "trigger",
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
  const isAuthed: boolean = window.localStorage.getItem("user") != null;
  if (requireAuth && !isAuthed) {
    next("/login");
  } else {
    next();
  }
});
export default router;
