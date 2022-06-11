<template>
    <v-dialog v-model="productSelection.dialog">
        <v-card>
            <v-card-title>
                <span>
                    {{ productSelection.item.product.name }}
                </span>
                <v-spacer></v-spacer>
                <v-btn icon @click="close()">
                    <v-icon> mdi-close </v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                {{ productSelection.item.product.description }}
            </v-card-text>
            <v-card-actions>
                <v-btn icon color="#009688" @click="decrement()">
                    <v-icon>mdi-minus</v-icon>
                </v-btn>
                <span>{{ productSelection.item.quantity }}</span>
                <v-btn icon color="#009688" @click="increment()">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="addItem()">Adicionar</v-btn>
            </v-card-actions>
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
            if (!this.productSelection.item || this.productSelection.item.quantity === 0) {
                this.close();
                console.log('Não foi possível adicionar o item');
                return;
            }
            console.log('adicionou item');
            this.$emit('on-add-item', {
                product: this.productSelection.item.product,
                quantity: this.productSelection.item.quantity,
            });
        },
        close() {
            this.$emit('close');
        },
    },
});
</script>
