<template>
    <div id="auth-window">
        <h1>Авторизация</h1>
        <form action="auth">
            <label for="user">Логин</label>
            <input id="user" type="text" v-model="user" placeholder="example94" />
            <label for="password">Пароль</label>
            <input id="password" type="password" placeholder="Минимум 6 знаков" />
            <button :disabled="!user" @click="submitName">Войти</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const user = ref('')

//берем имя, введеное пользователем и передаем его в глобал стор и в динамический роут
import { useRouter } from 'vue-router';
const router = useRouter()

import { useStore } from 'vuex';
const store = useStore()

const submitName = () => {
    store.commit('submitUserName', user.value)
    router.push({ name: 'User', params: { userName: user.value } })
}
</script>
<style lang="scss" scoped>
@import "../assets/vars.scss";
#auth-window {
    border-radius: 25px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    padding: 1rem;
    margin: 3rem 1rem;

    h1 {
        margin: 0 auto 4rem auto;
        &:hover {
            cursor: default;
        }
    }
    form {
        display: grid;
        grid-template-columns: 1fr;
        justify-content: center;
        grid-gap: 1.1rem;
        margin: 1rem;

        input {
            font-size: 1rem;
            outline: none;
            background-color: transparent;
            color: $prim-color;
            font-family: $font;
            border: none;
            border-bottom: 1px solid $prim-text;
            &:focus {
                border-bottom: 1px solid $prim-color;
            }
            &:placeholder {
                color: gray;
            }
        }
        label {
            justify-self: start;
        }
        button {
            justify-self: center;
            border-radius: 25px;
            cursor: pointer;
            background-image: $gradient;
            border: none;
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
                0 10px 10px rgba(0, 0, 0, 0.22);
            transition: 0.5s ease;
            padding: 1rem;
            font-size: 1.5rem;
            color: $prim-text;
            font-family: $font;
            &:disabled {
                background: $disabled;
                cursor: default;
                color: black;
                transform: scale(90%);
            }
            &:active {
                transform: scale(90%);
            }
        }
    }
}

@media (min-width: $medium-screen) {
    #auth-window {
        max-width: 80%;
        margin: 3rem auto;
    }
}

@media (min-width: $large-screen) {
    #auth-window {
        max-width: 718px;
        margin: 3rem auto;
    }
}
</style>