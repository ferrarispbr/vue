<script setup lang="ts">

    import { computed } from 'vue';


    const corTitulo = computed(() => {

        if (props.classe === 'alert-success') 
        {
            return 'text-success'
        }

        if (props.classe === 'alert-danger') 
        {
            return 'text-danger'
        }

        return ''
    })

    const corBarra = computed(() => {

        if (props.classe === 'alert-success') 
        {
            return 'bg-success'
        }

        if (props.classe === 'alert-danger') 
        {
            return 'bg-danger'
        }

        return 'bg-secondary'
    })


    /* ......................................................
     - Emits
     - ele é responsável da comunicação do FILHO para o PAI 
    ...................................................... */

    const emit = defineEmits([
        'fechar'
    ])


    /* ......................................................
     - Props   
     - ele é responsável da comunicação do PAI para o FILHO  
    ...................................................... */

    const props = defineProps<{
        titulo: string
        texto: string
        classe: string
        icone: string
    }>()

</script>

<template>
    <div v-if="props.texto" class="alert mt-3 position-relative" :class="props.classe">
        <div class="d-flex">
            <div :class="corBarra" style="width: 8px;"></div>
            <div class="flex-grow-1 p-4">
                <div class="fw-bold mb-2 d-flex align-items-center" :class="corTitulo">
                    <i :class="props.icone" class="me-2"></i>
                    {{ props.titulo }}
                </div>
                <div>
                    {{ props.texto }}
                </div>
                <button type="button" @click="emit('fechar')" class="btn-close position-absolute top-0 end-0 m-2" aria-label="Fechar"></button>
            </div>
        </div>
    </div>
</template>