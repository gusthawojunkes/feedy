<template>
    <v-container>
        <div class="text-h5 mt-12 mb-12">Olá, mesa {{ tableId }}</div>
        <v-row :key="option.path" class="mt-12">
            <NavigationButton :properties="option" :disabled="hasOrder"></NavigationButton>
        </v-row>
        <v-row>
            <CardSubmit :properties="cardSubmit"></CardSubmit>
        </v-row>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import NavigationButton from '@/components/buttons/NavigationButton.vue';
import CardSubmit from '@/components/cards/CardSubmit.vue';

export default defineComponent({
    name: 'HomeView',

    mounted() {
        this.hasOrder = this.hasOpenedOrder();
    },

    data: () => ({
        hasOrder: false,
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
                const table = sessionStorage.getItem('table');
                if (!table && to.redirectedFrom) {
                    const { id } = to.redirectedFrom.params;
                    sessionStorage.setItem('table', id);
                    this.tableId = id;
                } else {
                    this.tableId = table;
                }
            },
        },
    },

    methods: {
        hasOpenedOrder() {
            return sessionStorage.getItem('order') !== null;
        },
    },

    components: {
        NavigationButton,
        CardSubmit,
    },
});
</script>
