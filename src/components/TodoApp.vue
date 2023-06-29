<script setup>

    import TodoForm from './TodoForm.vue';
    import TodoList from './TodoList.vue';

    import { Filters } from '../utilities/const.utility';

    import { useTodo } from '../stores/todo.store';
    import { computed } from 'vue';
    import { storeToRefs } from 'pinia';

    import ClipboardList from 'vue-material-design-icons/ClipboardList.vue';
    import Information from 'vue-material-design-icons/Information.vue';
    import Alert from 'vue-material-design-icons/Alert.vue';
    import CheckAll from 'vue-material-design-icons/CheckAll.vue';
    import BookRemoveMultipleOutline from 'vue-material-design-icons/BookRemoveMultipleOutline.vue';
    import CheckboxMultipleBlankOutline from 'vue-material-design-icons/CheckboxMultipleBlankOutline.vue';

    const store = useTodo();
    const { countAll, countCompleted, countPending, filter } = storeToRefs(store);
    const { doneAll, unDoneAll, deleteAllTodoCompleted } = store;

    const hasTodo = computed(()=>{
        return (countAll.value > 0) ? true : false;
    })

    const deleteAllCompleted = ()=>{
        if(!confirm('Desea eliminar todas las tareas completadas?')) return;

        deleteAllTodoCompleted();
    }


</script>

<template>
    <h1 class="text-3xl text-indigo-800 font-bold mb-4 text-center">
        <ClipboardList />Todo App
    </h1>
    <div class="bg-indigo-100 p-5 rounded-lg shadow-lg">
        
        <div v-if="hasTodo" class="text-sm bg-blue-200 text-blue-800 p-2 rounded-lg mt-2 border-1 border-blue-800 text-center">
            <Information />Tareas completadas: {{ countCompleted }} / {{ countAll}}
        </div>

        <TodoForm />

        <div v-if="hasTodo" class="flex justify-between text-sm pb-2 mb-2">
            <div class="flex">
                <span class="font-bold mr-2">Filtro: </span>
                <ul class="flex">
                    <li class="mr-2">
                        <a href="" :class="`${ (filter===Filters.All) ? 'text-blue-600 underline' : '' }`" @click.prevent="filter=Filters.All">Todos</a>
                    </li>
                    <li class="mr-2">
                        <a href="" :class="`${ (filter===Filters.Completed) ? 'text-blue-600 underline' : '' }`" @click.prevent="filter=Filters.Completed">
                            Completadas
                        </a>
                    </li>
                    <li class="mr-2">
                        <a href="" :class="`${ (filter===Filters.Pending) ? 'text-blue-600 underline' : '' }`" @click.prevent="filter=Filters.Pending">
                            Pendientes
                        </a>
                    </li>
                </ul>
            </div>
            <div class="flex">
                <span class="font-bold mr-2">Acciones: </span>
                <ul class="flex">
                    <li class="mr-2">
                        <a href="#" @click.prevent="doneAll" class="border-2 border-blue-700 p-1 hover:text-white hover:bg-blue-700 hover:border-amber-400" title="Marcar todos como completados">
                            <CheckAll />
                        </a>
                    </li>
                    <li class="mr-2">
                        <a href="#" @click.prevent="unDoneAll" class="border-2 border-blue-700 p-1 hover:text-white hover:bg-blue-700 hover:border-amber-400" title="Marcar todos como pendientes">
                            <CheckboxMultipleBlankOutline />
                        </a>
                    </li>
                    <li class="mr-2">
                        <a href="" @click.prevent="deleteAllCompleted" class="border-2 border-blue-700 p-1 hover:text-white hover:bg-blue-700 hover:border-amber-400" title="Eliminar completados">
                            <BookRemoveMultipleOutline />
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <TodoList />

        <div v-if="!hasTodo" class="bg-amber-200 text-amber-950 p-2 rounded-lg mt-2 border-1 border-blue-800 flex justify-center items-center">
            <span class="text-lg"><Alert /></span>Empieza agregando una nueva tarea!
        </div>
        <div v-else>

            <div v-if="countPending===0 && filter===Filters.Pending" class="bg-emerald-300 rounded-lg text-green-800 p-2 font-bold text-center">
                No hay tareas pendientes
            </div>
            <div v-if="countCompleted===0 && filter===Filters.Completed" class="bg-emerald-300 rounded-lg text-green-800 p-2 font-bold text-center">
                No hay tareas completadas
            </div>

            <div class="flex justify-between text-sm py-2 bg-amber-200 p-2 mt-2">
                <div><span class="font-bold">Total:</span> {{ countAll }}</div> 
                <div><span class="font-bold">Pendientes:</span> {{ countPending }}</div>
                <div><span class="font-bold">Completados:</span> {{ countCompleted }}</div>
            </div>
        </div>
    </div>
    
</template>
