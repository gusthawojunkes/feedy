<template>
    <v-container>
        <div class="text-h6 mt-12 mb-5 text-center">Pedidos Abertos</div>
        <card-order v-if="isOpen()" :order="orderOpen"></card-order>
        <v-btn v-if="!isOpen()" block :to="createNewOrder">Criar novo Pedido!</v-btn>

        <div class="text-h6 mt-12 mb-5 text-center">Pedidos Fechados</div>
        <order-list :orders="ordersClosed"></order-list>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import CardOrder from '@/components/Order/CardOrder.vue';
import OrderList from '@/components/Order/OrderList.vue';

export default defineComponent({
    name: 'OrdersView',

    async mounted() {
        this.orderOpen = [];
        this.ordersClosed = [];
    },

    data: () => ({
        orderOpen: {},
        ordersClosed: [],
        isOpenOrder: false,
        createNewOrder: '/cardapio',
    }),

    methods: {
        isOpen() {
            return Object.keys(this.orderOpen).length <= 0 ? false : true;
        },
    },

    components: {
        OrderList,
        CardOrder,
    },
});
</script>

<style></style>
