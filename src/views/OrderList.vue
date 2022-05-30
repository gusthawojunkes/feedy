<template>
    <v-container>
        <v-row>
            <v-col v-for="(order, index) in orders" :key="order.uid">
                <v-card>
                    <v-card-title>
                        <span class="headline">Pedido #{{ index + 1 }}</span>
                        <v-spacer></v-spacer>
                        <span>{{ order.paid === true ? 'FECHADO' : 'ABERTO' }}</span>
                    </v-card-title>
                    <v-card-text>
                        <div v-for="item in order.items" :key="item.uid" style="margin-bottom: 2px">
                            <v-badge color="info" :content="item.quantity" inline></v-badge>
                            {{ item.product.name }}
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import OrderService from '@/services/order.service';
import _ from 'lodash';

export default defineComponent({
    name: 'OrdersView',

    async mounted() {
        await this.updateOrders();
    },

    data: () => ({
        orders: [],
    }),

    methods: {
        async updateOrders() {
            this.orders = await OrderService.getAll();
            _.sortBy(this.orders, 'createdAt');
        },
    },
});
</script>
