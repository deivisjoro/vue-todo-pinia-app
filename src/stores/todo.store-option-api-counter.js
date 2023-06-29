import { defineStore } from 'pinia';

export const useTodo = defineStore('todo', {
    state: () => {
        return {
            counter: 1
        }
    },
    getters: {
        cuadradoDeCounter: (state)=>{
            return state.counter*state.counter;
        }
    },
    actions: {
        incrementar(){
            this.counter++;
        }
    }
})