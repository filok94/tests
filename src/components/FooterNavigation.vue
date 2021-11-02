<template>
    <footer>
        <div class="bottom-menu home">
            <img src="../assets/home.png" alt />
        </div>
        <div @click="logOut" class="bottom-menu bottom-user">
            <img width="40" src="https://avatars.dicebear.com/api/micah/:seed.svg" alt />
        </div>
    </footer>
</template>

<script setup>
import { reactive } from 'vue'
import { getAuth, signOut } from '@firebase/auth'
import { useRouter } from 'vue-router'
const localStorageSet = (key, value) => JSON.stringify(window.localStorage.setItem(key, value))
const router = useRouter()
const auth = getAuth()
const logOut = () => {
    signOut(auth).then(() => {
        localStorageSet('isAuthed', false)
        localStorageSet('isAuthedBy', null)
        router.push('/login')
    }).catch((error) => {
        console.log(error.code)
    })
}
let footerLinks = reactive([])

</script>

<style lang="scss" scoped>
</style>