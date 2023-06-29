<script setup>
    
    import TodoListItem from './TodoListItem.vue';
    // import Task from '../models/task.model';
    import { useTodo } from '../stores/todo.store';
    
    import { toRefs, toRef, computed } from 'vue';
    import { Filters } from '../utilities/const.utility';

    const store = useTodo();
    const { getTodos } = store;
    
    const { filter } = toRefs(store);

    const todoList = toRef(getTodos());

    const todoListFilter = computed(()=>{
        switch (filter.value) {
            case Filters.All:            
                return todoList.value;
            case Filters.Completed:
                return todoList.value.filter(todo => todo.done);
            case Filters.Pending:
                return todoList.value.filter(todo => !todo.done);
            default:
                throw new Error(`option ${ filter } is not valid`);
        }
    })

</script>

<template>
    <div>
        <ul>
            <template v-for="(task) in todoListFilter" :key="task.id">
                <TodoListItem :task="task" />    
            </template>
        </ul>
    </div>
</template>