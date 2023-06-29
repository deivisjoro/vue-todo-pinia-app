<script setup>

    import { useTodo } from '../stores/todo.store';

    const store = useTodo();

</script>

<template>

    <h2>counter</h2>
    <p>
        counter del state en el hijo: {{ store.counter }}
    </p>
    <div>acciones</div>
    <div>
        <button @click="store.incrementar">incrementar</button>
    </div>
    
</template>

<style scoped>

</style>
