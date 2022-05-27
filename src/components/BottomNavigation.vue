<template>
    <v-bottom-navigation :value="value" color="primary">
        <v-btn to="/">
            <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn>
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn>
            <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>
        <v-btn>
            <v-icon>mdi-help</v-icon>
        </v-btn>
        <v-btn to="/produtos">
            <v-icon>mdi-cart</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BottomNavigation',
    data: () => ({ value: 'bottom-navigation' }),
});
</script>

<style></style>
