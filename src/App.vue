<template>
    <v-app>
        <AppBar :options="options" v-if="isDesktop" />
        <v-main>
            <div v-if="isDesktop">
                <v-container>
                    <router-view />
                </v-container>
            </div>
            <div v-else>
                <router-view />
            </div>
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
    },

    data: () => ({
        isDesktop: false,
        options: [
            { name: 'Home', icon: 'mdi-home', path: '/' },
            { name: 'Pedido Aberto', icon: 'mdi-pencil', path: '/pedido' },
            { name: 'Pedidos', icon: 'mdi-format-list-bulleted', path: '/pedidos' },
            { name: 'Produtos', icon: 'mdi-cart', path: '/produtos' },
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
