import { createApp } from "vue";
import { initializeApp } from "firebase/app";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import router from "./router";
import App from "./App.vue";
import { createPinia } from "pinia";

const firebaseConfig = {
  apiKey: "AIzaSyDo305GTXwGcEcRLuPb3-GG_aZS6jbE6Nc",
  authDomain: "sjtests.firebaseapp.com",
  projectId: "sjtests",
  databaseURL:
    "https://sjtests-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "sjtests.appspot.com",
  messagingSenderId: "106403937154",
  appId: "1:106403937154:web:f6d77fa2f2caad85bc6d9b",
};

const fireApp = initializeApp(firebaseConfig);
const localStorageSet = (key: string, value: any) =>
  JSON.stringify(window.localStorage.setItem(key, value));
let auth = getAuth();
onAuthStateChanged(auth, async (user) => {
  if (user) {
    localStorageSet("isAuthed", true);
    localStorageSet("isAuthedBy", user.email);
    localStorageSet("isAuthedById", user.uid);
  } else {
    localStorageSet("isAuthed", false);
    localStorageSet("isAuthedBy", null);
    localStorageSet("isAuthedById", null);
  }
});
getDatabase(fireApp);
const app = createApp(App);
app.use(createPinia()).use(router).mount("#app");
