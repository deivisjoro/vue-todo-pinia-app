<script setup>

    import HeaderApp from './components/common/HeaderApp.vue';
    import FooterApp from './components/common/FooterApp.vue';
    import TodoApp from './components/TodoApp.vue';

</script>

<template>
    <HeaderApp />
    <div class="main-container w-7/12 mx-auto mt-5 px-10 py-3 mb-10">
        <TodoApp />
    </div>
    <FooterApp />
</template>

<style scoped>
    .main-container{   
        max-width: 1280px;
    }
</style>