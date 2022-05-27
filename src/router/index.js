import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/cardapio',
            name: 'cardapio',
            component: () => import('@/components/menu/ProductList.vue'),
        },
        {
            path: '/central-ajuda',
            name: 'central-ajuda',
            component: () => import('@/views/HelpCenterView.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('@/views/shared/PageNotFound.vue'),
            meta: {
                title: 'Página não encontrada',
                hideMainNavigation: true,
            },
        },
    ],
});

export default router;
