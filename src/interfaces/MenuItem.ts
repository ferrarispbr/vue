export interface MenuItem
{
    titulo: string;

    rota?: string;

    filhos?: MenuItem[];
}