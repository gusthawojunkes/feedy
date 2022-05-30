<template>
    <v-container>
        <div class="text-h5 mt-5 mb-12">Olá, mesa {{ tableId }}</div>
        <v-row v-for="option in pathOptions" :key="option.path">
            <NavigationButton :properties="option"> </NavigationButton>
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
    data: () => ({
        pathOptions: [
            {
                title: 'Novo Pedido',
                path: '/pedido',
            },
            {
                title: 'Central de Ajuda',
                path: '/central-ajuda',
            },
        ],
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

    components: {
        NavigationButton,
        CardSubmit,
    },
});
</script>
