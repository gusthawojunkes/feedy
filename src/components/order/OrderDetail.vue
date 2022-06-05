<template>
    <v-card class="mb-8">
        <v-card-title>
            <span class="headline">Pedido {{ number }} </span>
            <v-spacer></v-spacer>
            <v-chip class="ma-2" :color="order.paid === true ? 'red' : 'green'" text-color="white">
                {{ order.paid === true ? 'FECHADO' : 'ABERTO' }}
            </v-chip>
        </v-card-title>
        <div class="d-flex">
            <v-col>
                <v-card-text>
                    <div v-for="item in order.items" :key="item.uid" style="margin-bottom: 2px">
                        <v-badge color="green my-1" :content="item.quantity" inline></v-badge>
                        {{ item.product.name }}
                    </div>
                </v-card-text>
            </v-col>
            <v-col class="d-flex flex-column justify-end align-end mr-4 my-3">
                <div>{{ getQuantity(order) }}</div>
                <div class="mt-4">{{ order.totalAmount ? order.totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 0 }}</div>
            </v-col>
        </div>
    </v-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'OrderDetail',

    data: () => ({
        orders: [],
    }),

    props: {
        order: {
            type: Object,
            default: () => ({}),
        },
        number: {
            type: Number,
            default: 0,
        },
    },

    methods: {
        getQuantity(order) {
            if (order.items) {
                return order.items.reduce((acc, item) => acc + item.quantity, 0);
            } else {
                return 0;
            }
        },
    },
});
</script>
