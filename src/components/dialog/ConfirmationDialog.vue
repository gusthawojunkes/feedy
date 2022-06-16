<template>
    <v-dialog v-model="dialog">
        <v-card class="px-1 py-12">
            <v-card-title class="text-center"> {{ properties.title }} </v-card-title>
            <v-card-actions>
                <v-btn @click="close()" block> OK </v-btn>
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
    mounted() {
        this.dialog = this.properties.showDialog;
    },
    data: () => ({
        dialog: true,
    }),
    methods: {
        close() {
            this.dialog = false;
        },
    },
});
</script>
