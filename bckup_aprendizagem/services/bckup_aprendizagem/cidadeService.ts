
/* -.-.-.-.-.-.-.-.-.-.- interfaces -.-.-.-.-.-.-.-.-.-.- */
    import type { Cidade } from '@/interfaces/Cidade';                      // interface de entrada de dados retornados da API
    import type { ResultadoCidade } from '@/interfaces/ResultadoCidade';    // interface de saida

import axios from 'axios';





export const cidadeService = {

    //async salvar(cidade: any) {  -->> aqui estamos utilizando sem a interface
    
    async salvar(cidade: Cidade): Promise<ResultadoCidade> { // utilizando a interfaze de retorno ResultadoCidade

        await new Promise(resolve => setTimeout(resolve, 3000));

        const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');

        return {
            id: response.data.id,
            nome: response.data.name,
            estado: 'SP'
        }
    }
}