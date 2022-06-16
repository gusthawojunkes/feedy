<template>
    <v-btn class="my-12 py-12" @click="finishAttendanceDialog = true" block max-width="500"> Finalizar atendimento </v-btn>
    <v-dialog v-model="finishAttendanceDialog">
        <v-card class="pa-4">
            <v-card-title class="text-center"> Deseja realmente finalizar seu atendimento? </v-card-title>
            <v-card-actions class="d-flex flex-column">
                <v-btn block variant="contained-text" @click="openNextCard()">Confirmar</v-btn>
                <v-btn block variant="plain" @click="finishAttendanceDialog = false" class="mt-4">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="confirmationDialog">
        <v-card class="px-1 py-12">
            <v-card-title class="text-center"> Atendimento finalizado! </v-card-title>
            <v-card-actions>
                <v-btn @click="confirmationDialog = false" block> OK </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'FinishAttendanceButton',

    data: () => ({
        finishAttendanceDialog: false,
    }),

    methods: {
        openNextCard() {
            this.finishAttendanceDialog = false;
            this.confirmationDialog = true;
        },
    },
});
</script>

<style scoped>
.v-btn {
    color: #009688;
}
</style>
