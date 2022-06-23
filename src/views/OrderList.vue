<template>
    <v-container>
        <div class="text-h5 mt-5 mb-12">
            <span>Histórico de Pedidos</span>
        </div>
        <div v-if="!loadingOrders && orders.length == 0">
            <v-alert prominent type="warning" variant="outlined"> Essa mesa não possui nenhum pedido ainda </v-alert>
        </div>
        <div v-else-if="loadingOrders" class="d-flex justify-center">
            <v-progress-circular indeterminate color="#009688"></v-progress-circular>
        </div>
        <div v-else v-for="(order, index) in this.orders" :key="order.uid">
            <OrderDetail :order="order" :number="this.orders.length - index"></OrderDetail>
        </div>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import OrderService from '@/services/order.service';
import _ from 'lodash';
import OrderDetail from '@/components/order/OrderDetail.vue';
import Helper from '@/utils/helper';

export default defineComponent({
    name: 'OrdersList',

    async mounted() {
        this.loadingOrders = true;
        await this.updateOrders();
        this.loadingOrders = false;
    },

    data: () => ({
        orders: [],
        loadingOrders: false,
    }),

    methods: {
        async updateOrders() {
            const tableNumber = Helper.getTableNumber();
            if (tableNumber !== null) {
                this.orders = await OrderService.getAllByTable(tableNumber);
                _.sortBy(this.orders, 'createdAt').reverse();
            }
        },
    },

    components: { OrderDetail },
});
</script>
