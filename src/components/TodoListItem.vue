<script setup>
    import { toRefs, toRef, computed } from "vue";
    import Task from "../models/task.model";
    import { useTodo } from '../stores/todo.store';
    import CheckBold from 'vue-material-design-icons/CheckBold.vue';
    import Delete from 'vue-material-design-icons/Delete.vue';
    import TimeStart from 'vue-material-design-icons/ClockTimeEightOutline.vue';
    import TimeUpdate from 'vue-material-design-icons/Update.vue';

    const props = defineProps({
        task: Task
    })

    const store = useTodo();
    const { toggleDoneTodo, deleteTodo, getTodos } = store; 
    const todoList = getTodos();   

    const { id, description, done, created, updated } = toRefs(props.task);

    const confirmDelete = ( id ) => {
        const task = todoList.value.find(task => task.id===id);
        if(!confirm(`Desea eliminar la tarea ${task.description}?`)) return;

        deleteTodo(id);
    }

    const formatDate = (value)=>{
        const date = new Date(value);
        const h = (0 + String(date.getHours())).slice(-2);
        const m = (0 + String(date.getMinutes())).slice(-2);
        const s = (0 + String(date.getSeconds())).slice(-2);
        return `${h}:${m}:${s}`;
    }

</script>

<template>

    <li class="flex justify-between px-3 py-1 text-blue-900 hover:bg-blue-600 rounded-full hover:text-white bg-blue-300 mb-1 border-2 border-blue-600 hover:border-amber-400">
        <div @click="toggleDoneTodo(id)" 
             class="flex justify-between w-full items-center cursor-pointer">
            <div class="flex items-center">
                <span :class="`flex items-center justify-center text-sm mr-2 h-5 w-5 border-2 ${done?'bg-blue-800 text-white border-white':'bg-white text-white border-blue-700'} rounded-full pb-1`">
                    <CheckBold />
                </span>
                <p class="text-lg">
                    {{ description }}
                </p>
            </div>
            <div>
                <span class="py-1 px-2 mr-2 mt-3 shadow-md rounded-full bg-green-500 text-white text-xs">
                    <span><TimeStart /></span>
                    {{ formatDate(created) }}
                </span>
                <span class="py-1 px-2 mr-2 mt-3 shadow-md rounded-full bg-yellow-500 text-white text-xs">
                    <span><TimeUpdate /></span>
                    {{ formatDate(updated) }}
                </span>
            </div>
        </div>
        <button @click="confirmDelete(id)" class="text-red-700 rounded-lg px-1 hover:bg-red-600 hover:text-white">
            <Delete />
        </button>
    </li>
    
</template>

<style scoped>

</style>
