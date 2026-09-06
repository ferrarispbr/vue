import type {Produto} from './Produto';

/*
    importamos a interface produto porque temos na
    interface ProdutoResultadoBusca, o Produto[]
    que o typescript precisa saber seu tipo

*/

export interface ProdutoResultadoBusca 
{
    produtos: Produto[];                /* motivo da importação da interface Produto */
    totalRegistros: number;
    paginaAtual: number;
    quantidadePorPagina: number;
    totalPaginas: number;
}