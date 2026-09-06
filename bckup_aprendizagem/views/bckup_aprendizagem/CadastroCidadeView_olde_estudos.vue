<script setup lang="ts">

    import { reactive,computed,watch } from 'vue';
    import MensagemAlerta from '@/components/MensagemAlerta.vue';
    import CardSimples from '@/components/CardSimples.vue';
    import CardCompleto from '@/components/CardCompleto.vue';
    import ListaCidades from '@/components/ListaCidades.vue';
    import { useContador } from '@/composables/bckup_aprendizagem/useContador';

    const {
        contador,
        incrementar,
        decrementar,
        zerar
    } = useContador()

    const cidade = reactive({
        nome: '',
        estado: '',
        capital: false
    })

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

    /*  === ele esta atuando no <input class="form-control" @input="limparMensagem" v-model="cidade.nome"> ===
        esta watch esta fazendo uma ação junta no input nome da cidade, com o limparMensagens
        o watch esta sendo executado primeiro e coloca a msg, no entanto
        temos o limparMensagens que acaba deixo vazio a mensagem
    */
    // watch(
    //     () => cidade.nome,
    //     (novoValor) => {
    //         //console.log('diparou');
    //         if (novoValor !== '') {
    //             mensagem.texto = 'O nome da cidade foi alterado.';
    //             mensagem.classe = 'alert-info';
    //         }

    //     }
    // )

    /* aqui ele esta observando um valor trazendo o ANTES e DEPOIS*/
    // watch(
    //     () => cidade.estado,
    //     (novoEstado, estadoAnterior) => {
    //         console.log('--- traz o ANTES e DEPOIS do combo ESTADO---');
    //         console.log('Estado alterado');
    //         console.log('Antes:', estadoAnterior);
    //         console.log('Agora:', novoEstado);
    //         console.log('---------------------------\n\n');
    //     }
    // )

    /* aqui ele esta observando mais de um valor trazendo o ANTES e DEPOIS*/
    // watch(
    //     [
    //         () => cidade.nome,
    //         () => cidade.estado
    //     ],
    //     (novosValores, valoresAnteriores) => {
    //         console.log('--- observando 2 campos, com ANTES e DEPOIS ---');
    //         console.log('WATCH MULTIPLO');
    //         console.log('Novos:', novosValores);
    //         console.log('Anteriores:', valoresAnteriores);
    //         console.log('---------------------------\n\n');
    //     }
    // )


    /*observando o objeto inteiro da cidade*/ 
    // watch(
    //     cidade,
    //     () => {
    //         console.log('--- observando OBJETO CIDADE ---');
    //         console.log('Objeto cidade alterado')
    //         console.log('---------------------------\n\n');
    //     }
    // )

    /* ----------------------WATCH
        utilizando o immediate: true 
        aqui ele ja verifica quando o carregamento do componente é feito
        ele faz o monitoramento de quando carrega e quando houver mudança

    watch(
        () => cidade.estado,
        (novoEstado) => {
            console.log('--- utilizando o  immediate: true ---');
            console.log('Watch Immediate');
            console.log(novoEstado);
            console.log('---------------------------\n\n');
        },
        {
            immediate: true,
        }
    )
    */

    /* ----------------------WATCH 
        trabalhando com o computed 
        const descricaoCidade

    watch(
        descricaoCidade,
        (novaDescricao, descricaoAnterior) => {
            console.log('--- trabalhando com o computed ---');
            console.log('Computed alterado')
            console.log('Antes:', descricaoAnterior)
            console.log('Agora:', novaDescricao)
            console.log('---------------------------\n\n');
        }
    )
    */

    const limparMensagem = () => {
        mensagem.texto = ''
        mensagem.classe = ''
    }

    const salvar = () => {

        if(cidade.nome === '')
        {
            mensagem.texto = 'Informe o nome da cidade.';
            mensagem.classe = 'alert-danger';
            return;
        }

        if (cidade.estado === '') 
        {
            mensagem.texto = 'Selecione um estado.';
            mensagem.classe = 'alert-danger';
            return;
        }

        mensagem.texto = 'Cidade validada com sucesso.';
        mensagem.classe = 'alert-success';

        console.log(cidade);
    }

</script>

<template>
    <div class="card">
        <div class="card-body">
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
                    <button type="submit" class="btn btn-primary" > Salvar </button>
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