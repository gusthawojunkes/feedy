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
                            {{ item.product.price * item.quantity }}
                        </div>
                    </div>
                </v-card-text>
            </div>
            <v-divider class="mt-4"></v-divider>
            <div class="d-flex justify-space-around my-4">
                <v-card-text class="text-h6 text--primary mt-3 ml-2"> {{ getQuantity(order) }} </v-card-text>
                <v-card-text class="text-h6 text--primary mt-3 mr-2 d-flex justify-end"> Total: {{ calculateTotalAmount() }} </v-card-text>
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
            return order.items.reduce((acc, item) => acc + item.quantity, 0);
        },

        calculateTotalAmount() {
            return this.order.items.reduce((sum, item) => {
                return sum + item.product.price * item.quantity;
            }, 0);
        },

        close() {
            this.confirmationDialog = false;
            this.$emit('close');
        },

        confirm() {
            this.$emit('on-confirm');
            this.close();
        },
    },

    data: () => ({
        isDesktop: false,
    }),
});
</script>
