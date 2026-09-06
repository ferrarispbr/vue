import {createRouter, createWebHistory} from 'vue-router';

import ProdutoListagemView              from '@/views/ProdutoListagemView.vue';

export const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL
    ),

    routes: [
        {
            path: '/',
            name: 'produtos',
            component: ProdutoListagemView
        }
    ]
});