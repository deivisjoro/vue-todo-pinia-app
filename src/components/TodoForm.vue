<script setup>
    import { ref } from 'vue';
    import { useTodo } from '../stores/todo.store';

    const store = useTodo();
    const { addTodo } = store;

    const description = ref('');
    const error = ref(false);

    const addTask = () => {
        error.value = false;
        if(description.value.trim().length===0){
            error.value = true;
            return;
        }

        addTodo(description.value.trim());

        description.value = '';        
    }

</script>

<template>
    <div>
        <form @submit.prevent="addTask" class="flex mb-2 py-4 items-center">
            <input type="text" v-model="description" class="rounded-lg w-full h-10 mr-2 text-blue-600 border-blue-300 border-2 focus:border-blue-900 outline-none p-2 text-lg" placeholder="descripcion tarea, ejemplo: finalizar proyecto..." name="description">
            <button class="bg-blue-500 hover:bg-blue-800 outline-none text-white font-bold rounded-lg px-4 py-2">
                Agregar
            </button>
        </form>
    </div>
    <div v-if="error">
        Debe ingresar una descripcion de la tarea
    </div>
</template>