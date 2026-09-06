
<script setup lang="ts">

    const props = defineProps<{
        titulo: string
    }>()

</script>




<template>
    <div class="card mt-3">
        <div class="card-header fw-bold">
            {{ props.titulo }}
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>