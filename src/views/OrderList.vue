<template>
    <v-container>
        <div class="text-h5 mt-5 mb-12">Histórico de Pedidos</div>
        <div v-for="(order, index) in this.orders" :key="order.uid">
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
            const tableNumber = sessionStorage.getItem('table');
            this.orders = await OrderService.getAllByTable(tableNumber);
            this.orders = _.sortBy(this.orders, 'createdAt').reverse();
        },
    },

    components: { OrderDetail },
});
</script>
