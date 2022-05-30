<template>
    <v-container>
        <div v-for="order in orders" :key="order.uid">
            {{ order.uid }}
            {{ order.items.length }}
        </div>

        <div class="text-h6 mt-12 mb-5 text-center">Pedidos Abertos</div>
        <v-btn v-if="!isOpen()" block :to="createNewOrder">Criar novo Pedido!</v-btn>

        <div class="text-h6 mt-12 mb-5 text-center">Pedidos Fechados</div>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import OrderService from '@/services/order.service';

export default defineComponent({
    name: 'OrdersView',

    async mounted() {
        this.orders = await OrderService.getAll();
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
});
</script>

<style></style>
