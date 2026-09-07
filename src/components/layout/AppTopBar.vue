<script setup lang="ts">
    import TopBarSistema from './TopBarSistema.vue'
    import TopBarUsuario from './TopBarUsuario.vue'

    const emit = defineEmits(['toggle-menu'])

    function handleToggleMenu() {
        emit('toggle-menu')
    }
</script>

<template>
    <header class="app-top-bar">
        <TopBarUsuario />

        <TopBarSistema @toggle-menu="handleToggleMenu" />
    </header>
</template>