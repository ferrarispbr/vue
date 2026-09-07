<script setup lang="ts">
    const emit = defineEmits(['toggle-menu'])

    function handleMenuButtonClick() {
        emit('toggle-menu')
    }
</script>

<template>
    <div class="top-bar-system">
        <button class="top-bar-system__menu-button" type="button" aria-label="Abrir ou recolher menu" @click="handleMenuButtonClick">
            <i class="bi bi-list" aria-hidden="true"></i>
        </button>

        <span class="top-bar-system__title">
            Sistema de Controle de Estoque
        </span>
    </div>
</template>