<script setup lang="ts">

    import {ref,onMounted,computed}     from 'vue';
    import type {Produto}       from '@/interfaces/Produto';
    import {ProductService}     from '@/services/ProductService';
    import {AxiosHttpClient}    from '@/infra/http/AxiosHttpClient';
    import {QTDE_PROD_PAGINA,QTDE_PAGINAS_VISIVEIS}   from '@/constants/constants';

    const httpClient        =   new AxiosHttpClient();
    const productService    =   new ProductService(httpClient);

    /*----- filtros -----*/
    const textoPesquisa = ref('');
    const categoriaSelecionada = ref('');  

    /*----- paginação -----*/
    const totalRegistros    =   ref(0);
    const totalPaginas      =   ref(0);
    const paginaAtual       =   ref(1);

    /*----- dados -----*/
    const produtos          =   ref<Produto[]>([]);

    /*----- estado da pagina -----*/
    const carregando        =   ref(false);

    /*----- responsável para criar um array que vai exibir no HTML numero de pagina 1,2,3 ... -----*/
    const paginas = computed(() =>{
        return Array.from(
                            { length: totalPaginas.value },
                            (_, index) => index + 1
                         );
    });

    const exibirUltimaPagina = computed(() =>
    {
        const ultimaPaginaVisivel =  paginasVisiveis.value[paginasVisiveis.value.length - 1];

        return (ultimaPaginaVisivel < totalPaginas.value);
    });

    const paginasVisiveis = computed(() =>{
        const   paginas: number[] = [];
        const   metade  =   Math.floor(QTDE_PAGINAS_VISIVEIS / 2 );
        let     inicio  =   paginaAtual.value - metade;

        let fim = paginaAtual.value + metade;

        if (inicio < 1)
        {
            inicio = 1;
            fim = Math.min(totalPaginas.value,QTDE_PAGINAS_VISIVEIS);
        }

        if (fim > totalPaginas.value)
        {
            fim = totalPaginas.value;
            inicio = Math.max(1,fim - QTDE_PAGINAS_VISIVEIS + 1);
        }

        for (let pagina = inicio; pagina <= fim; pagina++)
        {
            paginas.push(pagina);
        }

        return paginas;
    });

    function montarFiltro(paginaAtualFiltro = paginaAtual.value)
    {
        return {
            paginaAtual: paginaAtualFiltro,
            quantidadePorPagina: QTDE_PROD_PAGINA,
            textoPesquisa: textoPesquisa.value,
            categoriaSelecionada: '',
            ordenacao: ''
        };
    }


    async function carregarProdutos()
    {
        try
        {
            carregando.value    =   true;
            const resultado     =   await productService.listarProdutos(montarFiltro());

            produtos.value      =   resultado.produtos;
            totalRegistros.value=   resultado.totalRegistros;
            totalPaginas.value  =   resultado.totalPaginas;
            paginaAtual.value   =   resultado.paginaAtual;
        }
        catch (error)
        {
            console.error(error);
        }
        finally
        {
            carregando.value = false;
        }
    }

    /*----- função que faz a pesquisa de produtos e carrega o retorno para a view(template) -----*/
    async function produtosPesquisa()
    {
        if (!textoPesquisa.value.trim())
        {
            return;
        }
        
        const resultado = await productService.pesquisarProdutos(montarFiltro(1));

        /*----- carregamos o retorno da pequisa no template para exibir os dados -----*/
        produtos.value      =   resultado.produtos;
        totalRegistros.value=   resultado.totalRegistros;
        totalPaginas.value  =   resultado.totalPaginas;
        paginaAtual.value   =   resultado.paginaAtual;


    }
    
    /* ---------------- PAGINAÇÃO ----------------
    
        - NÃO PODEMOS TER OS CASOS
        -   Página 0
        -   Página -1
        -   Página 21 (quando só existem 20)

        -   Exibição de nº da pagina no pagina de produtos
                > Exibir no máximo que esta na variavel  QTDE_PAGINAS_VISIVEIS páginas.
                > Sempre tentar centralizar a página atual no meio da lista de numero paginas
                > Não deixar do lado esquerdo, sem nº pagina para poder retroagir pelos numero pagina
                > Não deixar do lado direito, sem nº pagina para avançar até o final
                > Quando existirem páginas ocultas após a faixa exibida mostrar "...".
                > Sempre exibir a última página.
                > Quando a página atual estiver próxima do final,exibir as últimas páginas e ocultar "...".

    --------------------------------------------*/

    async function proximaPagina()
    {
        if (paginaAtual.value >= totalPaginas.value)
        {
            return;
        }

        paginaAtual.value++;

        await carregarProdutos();
    }

    async function paginaAnterior()
    {
        if (paginaAtual.value <= 1)
        {
            return;
        }

        paginaAtual.value--;

        await carregarProdutos();
    }

    async function irParaPagina(pagina:number)
    {
        paginaAtual.value = pagina;
        await carregarProdutos();
    }


    onMounted(async () => {

        carregarProdutos();
    });

</script>

<template>

    <h1>Produtos</h1>

    <div>
        <label>Buscar Produto</label>
        <input type="text" v-model="textoPesquisa">
        <button @click="produtosPesquisa">Buscar</button>
    </div>

    <div>
        <label>Categoria</label>
        <select v-model="categoriaSelecionada">
            <option value="">Todas</option>
        </select>
    </div>

    <p>Total de produtos: {{ totalRegistros }}</p>
    <p>Página atual: {{ paginaAtual }}</p>
    <p>Total de páginas: {{ totalPaginas }}</p>

    <div>
        <button @click="paginaAnterior"> - </button>
        <span
            v-for="pagina in paginasVisiveis":key="pagina" @click="irParaPagina(pagina)" :style="{fontWeight:pagina === paginaAtual ? 'bold': 'normal'}">
            {{ pagina }}
        </span>
        <template v-if="exibirUltimaPagina">
            <span>...</span>
            <span @click="irParaPagina(totalPaginas)">{{ totalPaginas }}</span>
        </template>
        <button @click="proximaPagina"> + </button>

    </div>

    <p v-if="carregando"> Carregando...</p>

    <div v-for="produto in produtos":key="produto.id">
        <p>📦 {{ produto.nome }}</p>
        <p>📂 {{ produto.categoria }}</p>
        <p>💲 {{ produto.preco }}</p>
        <p>📦 Estoque:{{ produto.estoque }} {{ produto.unidadeMedida }}</p>
        <hr>
    </div>

</template>
