<script setup lang="ts">
// Importamos a regra de dados que você acabou de criar no Passo 1 usando o atalho @/
import type { ItemModulo } from '@/types/modulo'

// Criamos o contrato rígido: este componente EXIGE receber uma prop chamada 'modulos'
defineProps<{
  modulos: ItemModulo[]
}>()
</script>

<template>
  <div class="mt-4">
    <h6 class="text-secondary">Lista de Módulos (Componente Filho)</h6>
    
    <!-- Renderização usando as classes utilitárias locais do Bootstrap -->
    <ul class="list-group">
      <li 
        v-for="modulo in modulos" 
        :key="modulo.id" 
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        {{ modulo.titulo }}
        
        <span 
          class="badge" 
          :class="modulo.concluido ? 'bg-success' : 'bg-warning text-dark'"
        >
          {{ modulo.concluido ? 'Concluído' : 'Em andamento' }}
        </span>
      </li>
    </ul>
  </div>
</template>
