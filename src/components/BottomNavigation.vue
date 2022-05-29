<template>
    <v-bottom-navigation :value="value" color="primary">
        <v-btn to="/">
            <v-icon>mdi-home</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BottomNavigation',
    data: () => ({
        value: 'bottom-navigation',
        paths: [
            {
                name: 'Home',
                path: '/',
            },
            {
                name: 'Produtos',
                path: '/produtos',
            },
            {
                name: 'Pedidos',
                path: '/pedidos',
            },
            {
                name: 'Ajuda',
                path: '/ajuda',
            },
            {
                name: 'Carrinho',
                path: '/carrinho',
            },
        ],
    }),
});
</script>

<style></style>
