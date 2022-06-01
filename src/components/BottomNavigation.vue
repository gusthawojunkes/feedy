<template>
    <v-bottom-navigation :value="value" color="white" bg-color="teal">
        <v-btn :to="option.path" v-for="option in options" :key="option.path">
            <v-icon>{{ option.icon }}</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BottomNavigation',
    data: () => ({
        value: 'bottom-navigation',
        options: [
            { icon: 'mdi-home', path: '/' },
            { icon: 'mdi-pencil', path: '/pedido' },
            { icon: 'mdi-format-list-bulleted', path: '/pedidos' },
            { icon: 'mdi-help', path: '' },
            { icon: 'mdi-cart', path: '/produtos' },
        ],
    }),
});
</script>
