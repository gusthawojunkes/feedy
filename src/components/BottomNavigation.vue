<template>
    <v-bottom-navigation :value="value" color="primary">
        <v-btn v-for="path in paths" :key="path" :to="path.path">
            <v-icon>{{ path.icon }}</v-icon>
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
                icon: 'mdi-home',
            },
            {
                name: 'Produtos',
                path: '/pedido-aberto',
                icon: 'mdi-pencil',
            },
            {
                name: 'Pedidos',
                path: '/pedidos-criados',
                icon: 'mdi-format-list-bulleted',
            },
        ],
    }),
});
</script>

<style></style>
