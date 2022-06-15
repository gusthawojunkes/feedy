<template>
    <v-container>
        <div class="text-h5 mt-5 mb-12">Histórico de Pedidos</div>
        <div v-if="orders.length <= 0">
            <v-alert prominent type="warning" variant="outlined"> Essa mesa não possui nenhum pedido ainda </v-alert>
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

export default defineComponent({
    name: 'OrdersList',

    async mounted() {
        await this.updateOrders();
    },

    data: () => ({
        orders: [],
    }),

    methods: {
        async updateOrders() {
            let tableNumber = sessionStorage.getItem('table');
            if (tableNumber) {
                this.orders = await OrderService.getAllByTable(parseInt(tableNumber));
                debugger;
                this.orders = _.sortBy(this.orders, 'createdAt').reverse();
            }
        },
    },

    components: { OrderDetail },
});
</script>
