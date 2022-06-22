<template>
    <v-app>
        <AppBar :options="options" v-if="isDesktop" />
        <v-main>
            <v-container>
                <router-view />
            </v-container>
        </v-main>
        <BottomNavigation :options="options" v-if="!isDesktop" />
    </v-app>
</template>

<script>
import Helper from '@/utils/helper';
import AppBar from './components/AppBar.vue';
import BottomNavigation from './components/BottomNavigation.vue';

const APPLICATION_NAME = 'Feedy';

export default {
    name: 'App',
    mounted() {
        this.isDesktop = Helper.isDesktop();
        const tableNumber = Helper.getTableNumber();
        if (tableNumber == null) {
            this.options.push({ name: 'Produtos', icon: 'mdi-cart', path: '/produtos' });
        }
    },

    data: () => ({
        isDesktop: false,
        options: [
            { name: 'Home', icon: 'mdi-home', path: '/' },
            { name: 'Pedido', icon: 'mdi-pencil', path: '/pedido' },
            { name: 'Pedidos', icon: 'mdi-format-list-bulleted', path: '/pedidos' },
        ],
    }),

    watch: {
        $route: {
            immediate: true,
            handler(to) {
                document.title = to.meta.title || APPLICATION_NAME;
            },
        },
    },
    components: {
        AppBar,
        BottomNavigation,
    },
};
</script>

<style>
.v-main {
    width: 800px;
    margin: 0 auto;
}

.v-btn,
.v-tabs {
    color: #009688;
}
</style>
