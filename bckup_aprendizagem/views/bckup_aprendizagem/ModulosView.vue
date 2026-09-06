<script setup lang="ts">
import { ref } from 'vue'
import type { ItemModulo } from '@/types/modulo'
import ListaModulos from '@/components/ListaModulos.vue' //atualizado

const nomeProjeto = ref<string>('Estudos de Vue.js 3 + TypeScript')
const versaoVue = ref<number>(3)
const ambientePronto = ref<boolean>(true)

const alternarStatus = (): void => {
  ambientePronto.value = !ambientePronto.value
}

const listaModulos = ref<ItemModulo[]>([
  { id: 1, titulo: 'Configuração do Ambiente', concluido: true },
  { id: 2, titulo: 'Introdução ao TypeScript', concluido: true },
  { id: 3, titulo: 'Criação de Componentes e Props', concluido: false }
])
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ nomeProjeto }}</h5>
      <p class="card-text">Versão do Vue: {{ versaoVue }}</p>
      
      <p>
        Status do Ambiente: 
        <span class="badge" :class="ambientePronto ? 'bg-success' : 'bg-danger'">
          {{ ambientePronto ? 'Pronto para Uso' : 'Em Manutenção' }}
        </span>
      </p>
      
      <button class="btn btn-primary mb-3" @click="alternarStatus">
        Alternar Status
      </button>

      <!-- Passando os dados via PROP -->
      <ListaModulos :modulos="listaModulos" />
    </div>
  </div>
</template>
