<template>
    <v-dialog v-model="productSelection.dialog">
        <v-card :width="isDesktop ? 500 : '100%'">
            <v-toolbar color="#009688" dark prominent>
                <v-spacer></v-spacer>
                <v-btn icon @click="close()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-title class="text-h5 text--primary mt-3"> {{ productSelection.item.product.name }} </v-card-title>
            <v-card-text class="mt-8 mb-4">
                {{ productSelection.item.product.description }}
            </v-card-text>
            <v-card-actions class="mx-2 mb-1">
                <v-card class="px-4">
                    <v-btn icon outlined rounded color="#009688" @click="decrement()">
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <span class="px-4">{{ productSelection.item.quantity }}</span>
                    <v-btn icon color="#009688" @click="increment()">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-card>
            </v-card-actions>
            <v-btn @click="addItem()" outlined color="#009688" class="mx-4 mb-4">Adicionar</v-btn>
        </v-card>
    </v-dialog>
</template>
<script>
/* eslint-disable vue/no-mutating-props */
import { defineComponent } from 'vue';
import Helper from '@/utils/helper';
export default defineComponent({
    name: 'ProductSelectionModal',
    mounted() {
        this.isDesktop = Helper.isDesktop();
    },
    props: {
        productSelection: { type: Object, default: () => ({}) },
    },
    data: () => ({
        isDesktop: false,
    }),
    methods: {
        increment() {
            if (!this.productSelection.item.quantity) {
                this.productSelection.item.quantity = 0;
            }
            this.productSelection.item.quantity++;
        },
        decrement() {
            if (!this.productSelection.item.quantity) {
                this.productSelection.item.quantity = 0;
            }

            this.productSelection.item.quantity--;

            if (this.productSelection.item.quantity < 0) {
                this.productSelection.item.quantity = 0;
            }
        },
        addItem() {
            const item = this.productSelection.item;
            if (item && item.quantity !== 0) {
                item.product.actualQuantity = item.quantity;
                item.product.selected = true;
                this.$emit('on-add-item', {
                    product: item.product,
                    quantity: item.quantity,
                });
            } else if (item) {
                item.product.actualQuantity = 0;
                item.product.selected = false;
                this.$emit('on-remove', item.product.uid);
            }
            this.close();
        },
        close() {
            this.$emit('close');
        },
    },
});
</script>
