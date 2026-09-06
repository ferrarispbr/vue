    /*
        - criada para o retorno da cidadeService.ts
        - em 
            return {
                id: 1,
                nome: cidade.nome,
                estado: cidade.estado
            }

    */

    export interface ResultadoCidade {
        id: number
        nome: string
        estado: string
    }