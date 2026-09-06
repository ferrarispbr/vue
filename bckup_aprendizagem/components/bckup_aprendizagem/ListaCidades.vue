<script setup lang="ts">

const cidades = [
                    {
                        id: 1,
                        nome: 'Campinas',
                        estado: 'SP'
                    },
                    {
                        id: 2,
                        nome: 'Santos',
                        estado: 'SP'
                    },
                    {
                        id: 3,
                        nome: 'São Paulo',
                        estado: 'SP'
                    }
                ]

</script>

<template>
    <div v-for="cidade in cidades" :key="cidade.id">
        <slot :cidade="cidade"></slot>
    </div>
</template>