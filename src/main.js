import { createApp } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDo305GTXwGcEcRLuPb3-GG_aZS6jbE6Nc",
  authDomain: "sjtests.firebaseapp.com",
  projectId: "sjtests",
  storageBucket: "sjtests.appspot.com",
  messagingSenderId: "106403937154",
  appId: "1:106403937154:web:f6d77fa2f2caad85bc6d9b"
};

initializeApp(firebaseConfig);

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')

