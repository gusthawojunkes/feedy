<template>
    <v-dialog v-model="productSelection.dialog" transition="dialog-top-transition">
        <v-card width="500">
            <v-toolbar color="#009688" dark prominent>
                <v-toolbar-title>{{ productSelection.item.product.name }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="close()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text class="mt-8">
                {{ productSelection.item.product.description }}
            </v-card-text>
            <v-card-actions class="mx-2 mb-1">
                <v-card class="px-4">
                    <v-btn icon outlined rounded color="#009688" @click="decrement()">
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <span>{{ productSelection.item.quantity }}</span>
                    <v-btn icon color="#009688" @click="increment()">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-card>
                <!-- <v-spacer></v-spacer> -->
                <!-- <v-btn @click="close()" text>Cancelar</v-btn> -->
            </v-card-actions>
            <v-btn @click="addItem()" outlined color="#009688" class="mx-4 mb-4">Adicionar</v-btn>
        </v-card>
    </v-dialog>
</template>
<script>
/* eslint-disable vue/no-mutating-props */
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ProductSelectionModal',
    props: {
        productSelection: { type: Object, default: () => ({}) },
    },
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
            if (this.productSelection.item && this.productSelection.item.quantity !== 0) {
                this.$emit('on-add-item', {
                    product: this.productSelection.item.product,
                    quantity: this.productSelection.item.quantity,
                });
            }
            this.close();
        },
        close() {
            this.$emit('close');
        },
    },
});
</script>
