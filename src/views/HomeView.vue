<template>
    <v-container>
        <div class="text-h5 mt-12 mb-12">Olá, mesa {{ tableId }}</div>
        <v-row :key="option.path" class="mt-6">
            <NavigationButton :properties="option" :disabled="hasOrder"></NavigationButton>
        </v-row>
        <v-row class="mt-6">
            <CardSubmit :properties="cardSubmit"></CardSubmit>
            <FinishAttendanceButton v-if="!tableIsClosed"></FinishAttendanceButton>
        </v-row>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import NavigationButton from '@/components/buttons/NavigationButton.vue';
import CardSubmit from '@/components/cards/CardSubmit.vue';
import FinishAttendanceButton from '@/components/buttons/FinishAttendanceButton.vue';
import Helper from '@/utils/helper';
import TableService from '@/services/table.service';

export default defineComponent({
    name: 'HomeView',

    mounted() {
        this.hasOrder = this.hasOpenedOrder();
    },

    data: () => ({
        hasOrder: false,
        tableIsClosed: false,
        table: undefined,
        option: {
            title: 'Novo Pedido',
            path: '/pedido',
        },
        cardSubmit: {
            helpTitle: 'Quero ser atendido',
            finishingTitle: 'Você logo será atendido!',
            confirmationTitle: 'Confima a solicitação de ajuda?',
        },
    }),

    watch: {
        $route: {
            immediate: true,
            handler(to) {
                const table = Helper.getTableNumber();
                if (table == null && to.redirectedFrom) {
                    const { id } = to.redirectedFrom.params;
                    sessionStorage.setItem('table', id);
                    this.tableId = id;
                } else {
                    this.tableId = table;
                }
                this.reloadTable();
            },
        },
        table: {
            immediate: true,
            handler(table) {
                if (!table) {
                    return;
                }
                const status = table.status;
                if (status) {
                    this.tableIsClosed = status === 'closed';
                }
            },
        },
    },

    methods: {
        async reloadTable() {
            this.table = await TableService.getByNumber(this.tableId);
        },

        hasOpenedOrder() {
            return sessionStorage.getItem('order') !== null;
        },
    },

    components: {
        NavigationButton,
        CardSubmit,
        FinishAttendanceButton,
    },
});
</script>
