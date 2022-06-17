<template>
    <v-dialog v-model="confirmationDialog">
        <v-card>
            <v-card-title>
                <span> Deseja finalizar o pedido? </span>
            </v-card-title>
            <v-card-text> text </v-card-text>
        </v-card></v-dialog
    >
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'OrderConfirmationDialog',

    created() {
        this.confirmationDialog = this.dialog;
    },

    props: {
        dialog: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        confirmationDialog: false,
    }),

    methods: {
        close() {
            this.confirmationDialog = false;
            this.$emit('close');
        },

        confirm() {
            this.$emit('on-confirm');
            this.close();
        },
    },
});
</script>
