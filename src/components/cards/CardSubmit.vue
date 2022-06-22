<template>
    <v-btn class="my-12 py-12" @click="openSubmitCard = true" block max-width="500"> {{ properties.helpTitle }} </v-btn>
    <v-dialog v-model="openSubmitCard">
        <v-card class="pa-4">
            <v-card-title class="text-center"> {{ properties.confirmationTitle }} </v-card-title>
            <v-card-actions class="d-flex flex-column">
                <v-btn block variant="contained-text" @click="openNextCard()">Confirmar</v-btn>
                <v-btn block variant="plain" @click="openSubmitCard = false" class="mt-4">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="openFinishingCard">
        <v-card class="px-1 py-12">
            <v-card-title class="text-center"> {{ properties.finishingTitle }} </v-card-title>
            <v-card-actions>
                <v-btn @click="openFinishingCard = false" block> OK </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CardSubmit',

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

<style scoped>
.v-btn {
    color: #009688;
}
</style>
