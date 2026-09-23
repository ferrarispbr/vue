export interface MenuItem
{
    id: string;

    titulo: string;

    icone?: string;

    rota?: string;

    filhos?: MenuItem[];
}