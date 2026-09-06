
    /*
        - interface criada para ser utilizada em  cidadeService.ts -> async salvar(cidade: any) 
        - aonde vamos retirar o any (qualquer coisa) e colocamos essa interface para melhorar a qualidade dos dados
    */


    export interface Cidade {
        nome: string
        estado: string
        capital: boolean
    }