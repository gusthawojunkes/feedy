<template>
    <v-navigation-drawer expand-on-hover rail>
        <v-list>
            <v-img :src="LogoFeedy"></v-img>
        </v-list>

        <v-divider></v-divider>

        <v-list nav color="#009688">
            <v-list-item v-for="option in options" :key="option" :prepend-icon="option.icon" :title="option.name" :to="option.path"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { defineComponent } from 'vue';
import LogoFeedy from '@/assets/LogoFeedy.png';

export default defineComponent({
    name: 'AppBar',

    data: () => ({
        LogoFeedy: LogoFeedy,
    }),

    props: {
        options: {
            type: Object,
            default: () => ({}),
        },
    },
});
</script>
