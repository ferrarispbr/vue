import { createRouter, createWebHistory } from 'vue-router';

import LayoutPreviewView from '@/views/LayoutPreviewView.vue'
import ProdutoListagemView from '@/views/ProdutoListagemView.vue';

export const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL
    ),

    routes: [
        {
            path: '/',
            name: 'layout-preview',
            component: LayoutPreviewView,
        },
        {
            path: '/produtos',
            name: 'produtos',
            component: ProdutoListagemView
        }
    ]
});