import { defineStore } from 'pinia';
import { computed, reactive, toRefs } from 'vue';
import Task from '../models/task.model';
import { Filters } from '../utilities/const.utility';

export const useTodo = defineStore('todo', ()=>{
    
    const state = reactive({
        todoList: [
            new Task('task 1'),
            new Task('task 2'),
            new Task('task 3'),
        ],
        filter: Filters.All
    })

    const { todoList, filter } = toRefs(state); 

    todoList.value[1].done = true;

    const getTodos = (filter = Filters.All) => {
        return todoList;
    }

    const addTodo = ( description ) => {
        if(!description)
            throw new Error('Description is required');

        todoList.value.push( new Task(description) );
    }

    const toggleDoneTodo = ( id )=>{
        todoList.value = todoList.value.map(todo => {
            if(todo.id === id){
                todo.done = !todo.done;
                todo.updated = Date.now();
            }

            return todo;
        });
    }

    const doneAll = ()=>{
        todoList.value = todoList.value.map(todo => {                
            todo.done = true;
            todo.updated = Date.now();
            return todo;
        });
    }

    const unDoneAll = ()=>{
        todoList.value = todoList.value.map(todo => {                
            todo.done = false;
            todo.updated = Date.now();
            return todo;
        });
    }

    const deleteTodo = ( id )=>{
        todoList.value = todoList.value.filter(todo => todo.id !== id); 
    }

    const deleteAllTodoCompleted = ()=>{
        todoList.value = todoList.value.filter(todo => !todo.done); 
    }

    const countPending = computed(()=>{
        const total = todoList.value.reduce((total, task)=>{
            return (!task.done) ? total+1 : total;
        }, 0);
        return total;
    })

    const countCompleted= computed(()=>{
        const total = todoList.value.filter(task=>task.done).length
        return total;
    })

    const countAll = computed(()=>{
        const total = todoList.value.length;
        return total;
    })

    return {
        getTodos,
        addTodo,
        toggleDoneTodo,
        deleteTodo, 
        filter,
        doneAll,
        unDoneAll,
        deleteAllTodoCompleted,
        countPending,
        countCompleted,
        countAll
    }
})