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
            path: '/mesa/:id',
            name: 'mesa',
            redirect: '/',
        },
        {
            path: '/produtos',
            name: 'produtos',
            component: () => import('@/views/configuration/ProductsConfiguration.vue'),
        },
        {
            path: '/pedido/abertos',
            name: 'order',
            component: () => import('@/views/OrderView.vue'),
        },
        {
            path: '/pedidos',
            name: 'orders',
            component: () => import('@/views/OrderList.vue'),
        },
        {
            path: '/pedido',
            name: 'pedido',
            component: () => import('@/views/Order.vue'),
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
