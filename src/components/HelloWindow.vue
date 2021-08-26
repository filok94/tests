<template>
  <h1>{{ msg }}</h1>

  <p>My name is {{user}}
  </p>
  <p >Now i am {{age}}</p>
  <button @click="upTheAge">Bigger age!</button>
  <button v-if="!politic" @click="goToPolitic">Go to politic!</button>
  <button v-if="politic" @click="goBack">Go back!</button>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

defineProps({
  msg: String,
})

const store = useStore()
const user = computed(() => 
  store.state.sjw.name
)
const age = computed(() => 
  store.state.sjw.age
)
const upTheAge = () => store.commit('changeEverything', ['Nikolay', 2])

const router = useRouter()
let politic = ref(false)
const goToPolitic = ()=> {
  router.push({name: 'Politic'})
  politic.value = !politic.value
}
const goBack = ()=> {
  router.push({name: 'Home'})
  politic.value = !politic.value
}

</script>

<style scoped>
a {
  color: #42b983;
}
</style>
