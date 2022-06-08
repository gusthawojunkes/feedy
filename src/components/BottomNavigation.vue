<template>
    <v-bottom-navigation color="white" bg-color="#009688">
        <v-btn :to="option.path" v-for="option in options" :key="option.path">
            <v-icon>{{ option.icon }}</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BottomNavigation',

    props: {
        options: {
            type: Object,
            default: () => ({}),
        },
    },
});
</script>
