
<script setup lang="ts">
    defineProps<{mensagem: string;}>();
</script>

<template>
    <div v-if="mensagem">
        {{ mensagem }}
    </div>
</template>