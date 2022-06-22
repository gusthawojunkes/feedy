<template>
    <v-dialog v-model="properties.showDialog">
        <v-card class="px-1 py-12">
            <v-card-title class="text-center"> {{ properties.title }} </v-card-title>
            <v-card-actions>
                <div v-if="properties.type === 'CONFIRM_OR_CANCEL'">
                    <v-btn @click="confirm()" block> Confirmar </v-btn>
                    <v-btn @click="close()" block> Cancelar </v-btn>
                </div>
                <v-btn v-else @click="close()" block> OK </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ConfirmationDialog',
    props: {
        properties: {
            type: Object,
            default: () => ({}),
        },
    },
    methods: {
        close() {
            this.$emit('close');
        },
        confirm() {
            this.$emit('confirm');
        },
    },
});
</script>
