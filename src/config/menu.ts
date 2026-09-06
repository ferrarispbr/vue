import type { MenuItem }
    from '@/interfaces/MenuItem';

export const MENU: MenuItem[] =
[
    {
        titulo: 'Home',
        rota: '/'
    },

    {
        titulo: 'Produtos',
        filhos:
        [
            {
                titulo: 'Listar Produtos',
                rota: '/produtos'
            }
        ]
    }
];