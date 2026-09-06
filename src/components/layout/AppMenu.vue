<script setup lang="ts">

    import { MENU } from '@/config/menu';
    import { RouterLink } from 'vue-router';

</script>

<template>
    <nav>
        <div v-for="item in MENU":key="item.titulo">
            <RouterLink v-if="item.rota":to="item.rota"> {{ item.titulo }}</RouterLink>
            <span v-else>
                {{ item.titulo }}
            </span>
        </div>
    </nav>
</template>

