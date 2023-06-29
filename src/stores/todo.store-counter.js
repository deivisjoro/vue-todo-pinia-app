import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useTodo = defineStore('todo', ()=>{
    
    const counter = ref(1);

    const cuadradoDeCounter = computed(() => {
        return counter.value * counter.value;
    })
    
    const incrementar = ()=>{
        counter.value++;
    }

    return {
        counter,
        cuadradoDeCounter,
        incrementar
    }
})