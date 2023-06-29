<script setup>
  import Counter from './components/Counter.vue';
  import { useTodo } from './stores/todo.store';
  import { storeToRefs } from 'pinia'; //para no estar utilizando store.xxx

  const store = useTodo();
  const { counter, cuadradoDeCounter } = storeToRefs(store);
  const { incrementar } = store;

</script>

<template>
  <h1>app vue</h1>
  <p>
    counter del state en el padre: {{ counter }}
  </p>
  
  <p>
      Cuadrado: {{ cuadradoDeCounter }}
  </p>
  <div>
    <p>acciones</p>
    <div>
      <button @click="incrementar">Aumentar</button>
    </div>
  </div>

  <hr>

  <Counter />
</template>

<style scoped>
  #app{
    min-height: 100vh;
  }
</style>
