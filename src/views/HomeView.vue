<template>
    <v-container>
        <div class="text-h5 mt-5 mb-12">Olá, mesa</div>
        <v-row>
            <navigation-button :properties="buttomNewOrder"> </navigation-button>
        </v-row>
        <v-row>
            <navigation-button :properties="buttomHelpCenter"> </navigation-button>
        </v-row>
        <card-submit :properties="cardSubmit"></card-submit>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';

import NavigationButton from '@/components/buttons/NavigationButton.vue';
import CardSubmit from '@/components/cards/CardSubmit.vue';

export default defineComponent({
    name: 'HomeView',

    setup() {},

    data() {
        return {
            cardSubmit: {
                helpTitle: 'Quero ser atendido',
                finishingTitle: 'Você logo será atendido!',
                confirmationTitle: 'Confima a solicitação de ajuda?',
            },
            buttomNewOrder: {
                title: 'Novo Pedido',
                path: '/cardapio',
            },
            buttomHelpCenter: {
                title: 'Central de Ajuda',
                path: '/central-ajuda',
            },
            buttomHelp: {
                title: 'Quero ser atendido',
                path: '/help',
            },
        };
    },

    components: {
        NavigationButton,
        CardSubmit,
    },
});
</script>
