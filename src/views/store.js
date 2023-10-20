import { defineStore } from 'pinia'
import {ref} from 'vue'
export const user = defineStore('userdata', () => {
  const id = ref(0);
  const formid = ref(0);
})
/////
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})