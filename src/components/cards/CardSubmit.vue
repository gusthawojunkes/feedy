<template>
    <v-btn class="my-12 py-12" @click="openSubmitCard = true" block> {{ properties.helpTitle }} </v-btn>
    <v-dialog v-model="openSubmitCard">
        <v-card class="pa-4">
            <v-card-title class="text-center"> {{ properties.confirmationTitle }} </v-card-title>
            <v-card-text class="d-flex justify-center">
                <v-btn color="primary" class="ma-2" @click="openNextCard()" block> Confirmar </v-btn>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="primary" text @click="openSubmitCard = false" block> Cancelar </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="openFinishingCard">
        <v-card class="px-1 py-12">
            <v-card-title class="text-center"> {{ properties.finishingTitle }} </v-card-title>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="primary" @click="openFinishingCard = false" block> Ok </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CardOverlay',

    props: {
        properties: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        openSubmitCard: false,
        openFinishingCard: false,
    }),

    methods: {
        openNextCard() {
            this.openSubmitCard = false;
            this.openFinishingCard = true;
        },
    },
});
</script>
