
import type {HttpClient}                                from '@/infra/http/HttpClient';
import type {Produto}                                   from '@/interfaces/Produto';
import type {ProdutoRespostaListagem}                   from "@/interfaces/ProdutoRespostaListagem";
import type {ProdutoFiltro}                             from '@/interfaces/ProdutoFiltro';
import type {ProdutoResultadoBusca}                     from "@/interfaces/ProdutoResultadoBusca";
import {PRODUTOS_ENDPOINT,PRODUTOS_PESQUISA_ENDPOINT}   from '@/constants/constants'; /* não usa o type porque é uma constant */



export class ProductService
{
    /* ---------------------------I N F O R M A Ç Õ E S -------------------------------------------
     * private                  -> metodo privado
     * readonly                 -> depois de receber o valor ele não pode ser mais mudado
     * httpClient: HttpClient   -> Esta dependência deve obedecer ao HttpClient.
     * --------------------------------------------------------------------------------------------
     * no momento em que criarmos um service:
     * 
     *  const service = new ProductService(algumHttpClient);
     * 
     *  o TypeScript vai exigir que:
     * 
     *      algumHttpClient implemente:
     * 
     *          get()
     *          post()
     *          put()
     *          delete()
     * --------------------------------------------------------------------------------------------
     * 
    */
    constructor(private readonly httpClient: HttpClient) 
    {

    }

    private converterProduto(produtoApi: any): Produto 
    {

        return {
            id:             produtoApi.id,
            nome:           produtoApi.title,
            descricao:      produtoApi.description,
            categoria:      produtoApi.category,
            preco:          produtoApi.price,
            estoque:        produtoApi.stock,
            unidadeMedida:  'UN',
            imagem:         produtoApi.thumbnail,
            estoqueMinimo:  5
        };

    }

    /**
     * 
     * @param filtro 
     * 
     * 
     */
    async listarProdutos(filtro: ProdutoFiltro):Promise<ProdutoResultadoBusca> 
    {

        const limit         =   filtro.quantidadePorPagina;
        const skip          =   (filtro.paginaAtual - 1) * filtro.quantidadePorPagina;
        const params        =   {limit,skip};   /* um objeto */ 
        
        /* ------------------------------ trabalhando com o retorno da API ------------------------------- */
        const response      =   await this.httpClient.get<ProdutoRespostaListagem>(PRODUTOS_ENDPOINT,params);   /* chamada da API com o GET     */ 
        const produtos      =   response.data.products.map(produtoApi => this.converterProduto(produtoApi));    /* conversão dos nomes          */
        const totalPaginas  =   Math.ceil(response.data.total / filtro.quantidadePorPagina);                    /* arredondamento para maior    */

        /* --------------------------------- fazendo o retorno dos dados  -------------------------------- */
        return {
              produtos,
              totalRegistros: response.data.total,
              paginaAtual: filtro.paginaAtual,
              quantidadePorPagina: filtro.quantidadePorPagina,
              totalPaginas
        };
    }

    async pesquisarProdutos(filtro: ProdutoFiltro): Promise<ProdutoResultadoBusca>
    {

        const limit =   filtro.quantidadePorPagina;
        const skip  =   (filtro.paginaAtual - 1) * filtro.quantidadePorPagina;
        const params=   {q: filtro.textoPesquisa,limit,skip};

        /* ------------------------------ trabalhando com o retorno da API ------------------------------- */
        const response      =   await this.httpClient.get<ProdutoRespostaListagem>(PRODUTOS_PESQUISA_ENDPOINT,params);
        const totalPaginas  =   Math.ceil(response.data.total / filtro.quantidadePorPagina);
        const produtos      =   response.data.products.map(produtoApi => this.converterProduto(produtoApi));

        /* --------------------------------- fazendo o retorno dos dados  -------------------------------- */
        return {
            produtos,
            totalRegistros: response.data.total,
            paginaAtual: filtro.paginaAtual,
            quantidadePorPagina: filtro.quantidadePorPagina,
            totalPaginas
        };

    }

}