<template>
    <v-btn :disabled="disabled" class="py-12" @click="finishAttendanceDialog = true" block max-width="500"> Finalizar atendimento </v-btn>
    <v-dialog v-model="finishAttendanceDialog">
        <v-card class="pa-4">
            <v-card-title class="text-center"> Deseja realmente finalizar seu atendimento? </v-card-title>
            <v-card-actions class="d-flex flex-column">
                <v-btn block variant="contained-text" @click="confirmFinishAttendance()">Confirmar</v-btn>
                <v-btn block variant="plain" @click="finishAttendanceDialog = false" class="mt-4">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <ConfirmationDialog :properties="confirmDialogProps" @close="closeConfirmationDialog()"></ConfirmationDialog>
</template>

<script>
import { defineComponent } from 'vue';
import TableService from '../../services/table.service';
import Helper from '../../utils/helper';
import ConfirmationDialog from '@/components/dialog/ConfirmationDialog.vue';

export default defineComponent({
    name: 'FinishAttendanceButton',

    data: () => ({
        finishAttendanceDialog: false,
        disabled: false,
        confirmDialogProps: {
            showDialog: false,
            title: 'Atendimento finalizado com sucesso!',
            type: 'CONFIRMATION_ONLY',
        },
    }),

    components: {
        ConfirmationDialog,
    },

    methods: {
        confirmFinishAttendance() {
            this.finishAttendanceDialog = false;
            const tableNumber = Helper.getTableNumber();
            TableService.closeTable(tableNumber)
                .then(() => {
                    this.confirmDialogProps.showDialog = true;
                    this.disabled = true;
                })
                .catch(() => {
                    this.$toast.error('Erro ao finalizar atendimento, contate os reponsáveis do estabelecimento.');
                });
        },
        closeConfirmationDialog() {
            this.confirmDialogProps.showDialog = false;
        },
    },
});
</script>

<style scoped>
.v-btn {
    color: #009688;
}
</style>
