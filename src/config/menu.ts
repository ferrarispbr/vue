import type { MenuItem } from '@/interfaces/MenuItem';

export const MENU: MenuItem[] =
[
    {
        id: 'home',
        titulo: 'Home',
        icone: 'bi-house',
        rota: '/'
    },
    {
        id: 'produtos',
        titulo: 'Produtos',
        icone: 'bi-box-seam',
        filhos:
        [
            {
                id: 'produtos-listagem',
                titulo: 'Listar Produtos',
                icone: 'bi-list-ul',
                rota: '/produtos'
            }
        ]
    }
];