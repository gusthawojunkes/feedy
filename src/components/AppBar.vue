<template>
    <v-navigation-drawer expand-on-hover rail>
        <v-list>
            <v-img :src="logo"></v-img>
        </v-list>

        <v-divider></v-divider>

        <v-list nav color="#009688">
            <v-list-item v-for="option in options" :key="option" :prepend-icon="option.icon" :title="option.name" :to="option.path"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { defineComponent } from 'vue';
import logo from '@/assets/logo.png';

export default defineComponent({
    name: 'AppBar',

    data: () => ({
        logo: logo,
    }),

    props: {
        options: {
            type: Object,
            default: () => ({}),
        },
    },
});
</script>
