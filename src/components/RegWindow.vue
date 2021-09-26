<template>
    <div id="reg-window">
        <h1>Регистрация</h1>
        <form action="reg">
            <label for="new-user">Логин</label>
            <input id="new-user" type="text" v-model='registrationUser' placeholder="example94">
            <label for="new-password">Пароль</label>
            <input id="new-password" type="password" placeholder="Не менее 6 знаков">
            <label for="confirm-password">Подтвердите пароль</label>
            <input id="confirm-password" type="password" placeholder="Повторите пароль">
            <button :disabled="!registrationUser" @click='submitName'>Подтвердить</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";

const registrationUser = ref('')
</script>

<style lang="scss">
@import '../assets/vars.scss';
    #reg-window {
        border-radius: 25px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        padding: 1rem;
        margin: 3rem 1rem;

        h1 {
            margin: 0 auto 4rem auto;
        }
        form {
            display: grid;
            grid-template-columns: 1fr;
            justify-content: center;
            grid-gap: 1.1rem;
            margin: 1rem;
            
            input {
                border: none;
                font-size: 1rem;
                outline: none;
                border-bottom: 1px solid $prim-text; 
                background-color: transparent;
                color: $prim-text;
                font-family: $font;
                &:focus {
                    border-bottom: 1px solid $prim-color; 
                }
                &:placeholder {
                    color:gray;
                }
                }
            label {
                justify-self: start;
            }
            button {
                justify-self: center;
                border-radius: 25px;
                cursor: pointer;
                background: $prim-color;
                border: none;
                box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
                transition: .5s ease;
                padding: 1rem;
                font-size: 1.5rem;
                color: $prim-text;
                font-family: $font;
                &:disabled{
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
    #reg-window{
        max-width: 80%;
        margin: 3rem auto;
    }
}

@media (min-width: $large-screen) {
        #reg-window{
        max-width: 718px;
        margin: 3rem auto;
    }
}
</style>