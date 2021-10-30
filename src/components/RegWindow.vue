<template>
    <div id="reg-window">
        <form action="reg">
            <label for="new-user" class='unactive-form'></label>
            <input id="new-user" type="text" v-model="newUser.login" @click="isActive()" />
            <label for="new-password" class='unactive-form'></label>
            <input id="new-password" type="password" v-model="newUser.password" @click="isActive()" />
            <label v-if="addConfirmPassword" for="confirm-password" class='unactive-form'></label>
            <input
                v-if="addConfirmPassword"
                id="confirm-password"
                type="password"
                v-model="newUser.confirmationPassowrd"
                @click="isActive()"
            />
            <button @click.prevent="register()" :disabled="disableButton">Подтвердить</button>
        </form>
    </div>
</template>

<script setup>
import { reactive, defineProps, watch, ref, computed } from "vue";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
const props = defineProps({
    activeWindow: String
})
const auth = getAuth();

let addConfirmPassword = ref(false)
let newUser = reactive({
    login: '',
    password: '',
    confirmationPassowrd: ''
})
const disableButton = computed(() => {
    let sum = 0
    let condition = [newUser.password.length <= 6, newUser.login.length <= 1]
    condition.forEach((e) => {
        if (!e) {
            sum++
        }
    })
    if (sum > 1) {
        return false
    } else {
        return true
    }
})
let isActive = () => {
    let labels = Array.prototype.slice.call(document.querySelectorAll('label'))
    let filteredLabels = labels.filter(e => e.htmlFor == document.activeElement.id)[0]
    filteredLabels.classList.remove('unactive-form')
    for (let label of labels) {
        label.classList.add('unactive-form')
        label.classList.remove('active-form')
    }
    filteredLabels.classList.add('active-form')
}
const register = () => {
    if (newUser.password === newUser.confirmationPassowrd && newUser.password.length >= 6) {
        createUserWithEmailAndPassword(auth, newUser.login, newUser.password)
            .then((data) => {
                const user = data.user
                console.log('good', user)
            })
            .catch(error => {
                console.log(error.code)
                console.log(error.message)
            });
    } else {
        console.log('wrong')
    }

}

let animationProperties = reactive({
    to: null,
    from: null,
    timeout: null,
    get translatedTimeout() {
        return (this.timeout / 1000).toString() + 's'
    }
})
watch(
    props, () => {
        let reg = document.querySelector('#reg-window')
        let changeActiveWindow = (classToAnimate, to, from, timeout) => {
            reg.classList.add(classToAnimate)
            animationProperties.to = to
            animationProperties.from = from
            animationProperties.timeout = timeout
            setTimeout(() => {
                reg.classList.remove(classToAnimate)
            }, timeout)
            setTimeout(() => {
                addConfirmPassword.value = !addConfirmPassword.value
            }, timeout / 2)
        }
        if (props.activeWindow == 'auth') {
            changeActiveWindow('animationing', '-30rem', '30rem', 300)
        } else {
            changeActiveWindow('animationing', '30rem', '-30rem', 300)
        }
    }
)
</script>

<style lang="scss">
.animationing {
    @include going-away(
        v-bind("animationProperties.to"),
        v-bind("animationProperties.from"),
        v-bind("animationProperties.translatedTimeout")
    );
}
.unactive-form {
    &:before {
        content: "Login";
        position: relative;
        top: 2.5rem;
    }
}
.active-form {
    &:before {
        content: "Login";
        position: relative;
        top: 1rem;
        background: $prim-color;
        @include bcg-for-text();
        transition: ease-in-out .3s;
    }
}
#reg-window {
    border-radius: 25px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    padding: 1rem;
    margin: 3rem 1rem;
    @include card-bcg();

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
            display: block;
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
                color: $grey-color;
            }
        }
        label {
            justify-self: start;
        }
        button {
            justify-self: center;
            border-radius: 25px;
            cursor: pointer;
            background: $gradient;
            border: none;
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
                0 10px 10px rgba(0, 0, 0, 0.22);
            transition: 0.5s ease;
            padding: 1rem;
            font-size: 1.5rem;
            color: $prim-text;
            font-family: $font;
            &:disabled {
                background: $grey-color;
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
    #reg-window {
        max-width: 80%;
        margin: 3rem auto;
    }
}

@media (min-width: $large-screen) {
    #reg-window {
        max-width: 718px;
        margin: 3rem auto;
    }
}
</style>