import axios from 'axios'; // biblioteca para trabalhar com as APIS

import      { ref,reactive }        from 'vue';
import      { cidadeService }       from '@/services/cidadeService';
import type { ResultadoOperacao }   from '@/interfaces/ResultadoOperacao';
import      { HTTP_MESSAGES }       from '@/constants/httpMessages';




export function useCidade() {

    const carregando = ref(false); // estado de carregamento de um requisição

    /**
     * função que traz o retorno das validações de cidade e estado
     * @param sucesso 
     * @param tipo 
     * @param mensagem 
     * @returns 
     */
    const criarResultado = (sucesso: boolean,tipo: string, mensagem: string): ResultadoOperacao => {

        return {
            sucesso,
            tipo,
            mensagem
        }
    }    

    const cidade = reactive({
        nome: '',
        estado: '',
        capital: false
    })

    const limparFormulario = () => {

        cidade.nome     =   '';
        cidade.estado   =   '';
        cidade.capital  =   false;

    }

    const salvarCidade = async (): Promise<ResultadoOperacao> => {

        if (cidade.nome === '')
        {
            return criarResultado(false,'erro','Informe o nome da cidade.');
        }

        if (cidade.estado === '')
        {
            return criarResultado(false,'erro','Selecione um estado.');
        }

        carregando.value = true;

        /*----------------------- simulando um retorno de API -----------------------*/ 

            /* --->>> informações --------
                - o resolve é que traz os dados para dentro da minha variavel -> const resultadoApis
                - quando vc tem um erro reject, o fluxo pula para o catch, veja o exemplo:
                        try {
                            const resultado = await new Promise(
                                (resolve, reject) => {
                                    const cidadeExiste = true
                                    if (cidadeExiste)
                                    {
                                        reject('Cidade já cadastrada')
                                        return
                                    }
                                    resolve({
                                        id: 1,
                                        nome: 'São Paulo'
                                    })
                                }
                            )
                            console.log(resultado)
                        }
                        catch (erro) {
                            console.log('ERRO:', erro)
                        }
            
            */

            //await new Promise(resolve => setTimeout(resolve, 3000)) // exemplo simples

                /* ---- utilizando o resolver retornando valores para a variavel 
                    const resultadoApi = await new Promise((resolve) => {

                        setTimeout(() => {

                            resolve({
                                id: 1,
                                nome: cidade.nome,
                                estado: cidade.estado
                            })

                        }, 3000)

                    })
                */

            // ---- utilizando o reject para o tratamento do erro, não retorna nada para a variavel
                try
                {
                    const resultadoApi = await cidadeService.salvar(cidade);

                    console.log('ID:', resultadoApi.id)
                    console.log('Nome:', resultadoApi.nome)
                    console.log('Estado:', resultadoApi.estado)
                }
                catch (erro) 
                {
                    /*.-.-.-. tratamento de erro do retorno da API .-.-.-.*/
                    if (axios.isAxiosError(erro))
                    {
                        const status = erro.response?.status
                        // console.log('Mensagem:', erro.message)
                        // console.log('Status:', erro.response?.status)
                        // console.log('Data:', erro.response?.data)

                        const mensagem = status ? HTTP_MESSAGES[status]: 'Ocorreu um erro ao processar a requisição.'

                    }

                    return criarResultado(false,'erro',erro instanceof Error ? erro.message : String(erro));
                }
                finally
                {
                    carregando.value = false
                }

        /*-------------------------------------------------------------------------*/
       
        carregando.value = false
        
        return criarResultado(true,'sucesso','Cidade validada com sucesso.')
    }

    return {
        cidade,
        salvarCidade,
        limparFormulario,
        carregando
    }
}