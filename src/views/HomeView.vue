<template>
    <v-container>
        <div class="text-h5 mt-12 mb-12">Olá, mesa {{ tableId }}</div>
        <v-row :key="option.path" class="mt-12">
            <!-- <div class="text-h8 text-center" v-if="!createOrder">{{ errorMessages }}</div> -->
            <NavigationButton :properties="option" :disabled="createOrder"></NavigationButton>
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

    async mounted() {
        this.createOrder = this.validateOpenOrder();
    },

    data: () => ({
        createOrder: true,
        errorMessage: 'Já existe um pedido Aberto para esta mesa!',
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

                this.$toast.info(this.errorMessage, {
                    duration: false,
                    queue: true,
                    dismissible: true,
                });
            },
        },
    },

    methods: {
        validateOpenOrder() {
            if (sessionStorage.getItem('order')) {
                this.errorMessages = 'Já existe um pedido em Aberto!';
                return false;
            }
            return true;
        },
    },

    components: {
        NavigationButton,
        CardSubmit,
    },
});
</script>
