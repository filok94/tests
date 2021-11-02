import { createApp } from 'vue'
import { initializeApp } from 'firebase/app'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import store from './store'
import router from './router'
import App from './App.vue'

const firebaseConfig = {
  apiKey: "AIzaSyDo305GTXwGcEcRLuPb3-GG_aZS6jbE6Nc",
  authDomain: "sjtests.firebaseapp.com",
  projectId: "sjtests",
  storageBucket: "sjtests.appspot.com",
  messagingSenderId: "106403937154",
  appId: "1:106403937154:web:f6d77fa2f2caad85bc6d9b"
};

initializeApp(firebaseConfig);

let auth = getAuth()
onAuthStateChanged(auth, (user) => {
    createApp(App)
      .use(store)
      .use(router)
      .mount('#app')
      if (user) {
        console.log(user)
      } else {
        console.log('не залогинен')
      }
})



