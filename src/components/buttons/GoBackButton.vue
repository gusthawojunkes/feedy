<template>
    <v-btn @click="goBack()">
        <v-icon>mdi-chevron-left</v-icon>
        Voltar
    </v-btn>
</template>

<script>
export default {
    methods: {
        goBack() {
            return window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/');
        },
    },
};
</script>
