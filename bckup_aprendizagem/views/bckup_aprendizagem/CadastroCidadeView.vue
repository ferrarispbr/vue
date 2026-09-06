<script setup lang="ts">

    import { reactive,computed,watch } from 'vue';
    import MensagemAlerta from '@/components/MensagemAlerta.vue';
    //import CardSimples from '@/components/CardSimples.vue';
    //import CardCompleto from '@/components/CardCompleto.vue';
    //import ListaCidades from '@/components/ListaCidades.vue';
    import {useContador} from '@/composables/bckup_aprendizagem/useContador';
    import {useCidade} from '@/composables/bckup_aprendizagem/useCidade'
    
    const {
        cidade,
        salvarCidade,
        limparFormulario,
        carregando
    } = useCidade()

    const {
        contador,
        incrementar,
        decrementar,
        zerar
    } = useContador()

    const mensagem = reactive({
        texto: '',
        classe: ''
    })

    const descricaoCidade = computed(() => {
        return cidade.nome + ' - ' + cidade.estado
    })

    const tituloMensagem = computed(() => {

        if (mensagem.classe === 'alert-success') 
        {
            return 'Sucesso'
        }

        return 'Atenção'
    })

    const iconeMensagem = computed(() => {

        if (mensagem.classe === 'alert-success') {
            return 'bi bi-check-circle-fill'
        }

        return 'bi bi-exclamation-triangle-fill'

    })

    /* limpa a mensagem de erro quando o usuario começa a digitar a cidade */
    watch(  () => cidade.nome,
        (novoNome) => {

            if (novoNome.length >= 4) {
                limparMensagem()
            }

        }
    )

    /* limpa a mensagem de erro quando o usuário escolhe um estado */
    watch(
        () => cidade.estado,
        (novoEstado) => {

            if (novoEstado !== '') {
                limparMensagem()
            }
        }
    )    

    const limparMensagem = () => {
        mensagem.texto  =   '';
        mensagem.classe =   '';
    }

    const salvar = async () => {

        const resultado =   await salvarCidade();
        mensagem.texto  =   resultado.mensagem;
        mensagem.classe =   resultado.tipo === 'sucesso' ? 'alert-success' : 'alert-danger';

        if (resultado.sucesso)
        {
            limparFormulario();
        }
    }

</script>

<template>
    <div class="card">
        <div class="card-body">
            <div v-if="carregando" class="alert alert-warning mt-3">
                Salvando...
            </div>            
            <form @submit.prevent="salvar">
                <h3 class="card-title"> Cadastro de Cidade </h3>

                    <MensagemAlerta @fechar="limparMensagem" :titulo="tituloMensagem" :icone="iconeMensagem" :texto="mensagem.texto" :classe="mensagem.classe"/>

                <div class="mb-3">
                    <label class="form-label"> Nome da Cidade </label>
                    <input class="form-control"  v-model="cidade.nome"> 
                </div>
                <div class="mb-3">
                    <label class="form-label"> Estado </label>
                    <select class="form-select" v-model="cidade.estado"> <!-- @input="limparMensagem" -->
                        <option value=""> Selecione </option>
                        <option value="SP"> São Paulo </option>
                        <option value="RJ"> Rio de Janeiro </option>
                        <option value="MG"> Minas Gerais </option>
                    </select>
                </div>
                <div class="form-check">
                    <input class="form-check-input border-dark" type="checkbox" v-model="cidade.capital">
                    <label class="form-check-label"> Capital </label>
                </div>
                <div class="mt-3">
                    <button type="submit" class="btn btn-primary" :disabled="carregando" > {{ carregando ? 'Salvando...' : 'Salvar' }}</button>
                </div>
                <p> Descrição: {{ descricaoCidade }} </p>
                
                <!-- <hr/> -->

                <!-- <CardSimples titulo="Dados da Cidade">
                    <p> Este conteúdo veio do Slot. </p>
                </CardSimples> -->

                <!-- <hr/>

                <CardCompleto>

                    <template #header>
                        Dados da Cidade
                    </template>

                    <p>
                        Este é o conteúdo principal do card.
                    </p>

                    <template #footer>
                        Rodapé do Card
                    </template>

                </CardCompleto>

                <hr> -->

                <!-- <ListaCidades v-slot="dados">
                    {{ dados.cidade }}
                </ListaCidades> -->

                <!-- outra forma de fazer -->

                <!-- <ListaCidades v-slot="{cidade}">
                    {{ cidade.nome }}- {{ cidade.estado }}
                </ListaCidades> -->
                
                <hr style="height: 3px; background-color: #fa390a; border: none;">

                <div class="mt-3">

                    <p>Contador: {{ contador }}</p>
                    <button type="button" class="btn btn-success me-2" @click="incrementar"> + </button>
                    <button type="button" class="btn btn-warning me-2" @click="decrementar"> - </button>
                    <button type="button" class="btn btn-danger" @click="zerar"> Zerar </button>
                </div>

                 <hr style="height: 3px; background-color: #fa390a; border: none;">

                <h5>Objeto Cidade</h5>
                <pre>{{ cidade }}</pre>
            </form>
        </div>
    </div>
</template>>