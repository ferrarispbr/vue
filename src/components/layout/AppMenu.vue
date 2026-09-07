<script setup lang="ts">
    
    import TopBarUsuario from './TopBarUsuario.vue'
    defineProps<{
            isOpen: boolean
        }>()
</script>

<template>
    <nav class="app-menu" :class="{ 'app-menu--open': isOpen }" aria-label="Menu principal">
        <div class="app-menu__user">
            <TopBarUsuario />
        </div>

        <ul class="app-menu__list">
            <li class="app-menu__item">
                <i class="bi bi-house" aria-hidden="true"></i>

                <span class="app-menu__label">
                    HOME
                </span>
            </li>

            <li class="app-menu__item">
                <i class="bi bi-box-seam" aria-hidden="true"></i>

                <span class="app-menu__label">
                    Listar Produtos
                </span>
            </li>
        </ul>
    </nav>
</template>