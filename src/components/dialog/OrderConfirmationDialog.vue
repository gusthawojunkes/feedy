<template>
    <v-dialog v-model="orderConfirmationDialog">
        <v-card :class="isDesktop ? 'ml-14 pa-8' : 'pa-8'">
            <v-card-title class="text-h5 text-center my-8"> Deseja confirmar as informações do Pedido? </v-card-title>
            <div class="d-flex">
                <v-card-text>
                    <div v-for="item in order.items" :key="item.uid" style="margin-bottom: 2px" class="d-flex justify-space-between">
                        <div>
                            <v-badge color="green my-1" :content="item.quantity" inline></v-badge>
                            {{ item.product.name }}
                        </div>
                        <div class="d-flex justify-end mr-2">
                            {{ toBrazilianCurrency(item.product.price * item.quantity) }}
                        </div>
                    </div>
                </v-card-text>
            </div>
            <v-divider class="mt-4"></v-divider>
            <div class="d-flex justify-space-around my-4">
                <v-card-text class="text-h6 text--primary mt-3 ml-2"> Itens: {{ getQuantity(order) }} </v-card-text>
                <v-card-text class="text-h6 text--primary mt-3 mr-2 d-flex justify-end"> Total: {{ toBrazilianCurrency(order.totalAmount) }} </v-card-text>
            </div>
            <v-card-actions class="d-flex flex-column">
                <v-btn @click="close()" block color="#009688"> Cancelar </v-btn>
            </v-card-actions>
            <v-btn @click="confirm()" block color="#009688"> Confirmar </v-btn>
        </v-card>
    </v-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import Helper from '@/utils/helper';
import StringUtils from '@/utils/string.util';

export default defineComponent({
    name: 'OrderConfirmationDialog',

    mounted() {
        this.isDesktop = Helper.isDesktop();
    },

    props: {
        orderConfirmationDialog: {
            type: Boolean,
            required: true,
        },
        order: {
            type: Object,
            default: () => ({}),
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

        close() {
            this.confirmationDialog = false;
            this.$emit('close');
        },

        confirm() {
            this.$emit('on-confirm');
            this.close();
        },
        toBrazilianCurrency(value) {
            return StringUtils.convertIntoCurrency(value);
        },
    },

    data: () => ({
        isDesktop: false,
    }),
});
</script>
