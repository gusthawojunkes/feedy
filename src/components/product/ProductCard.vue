<template>
    <v-card elevation="2">
        <v-img :src="product.image" max-height="150" cover> </v-img>
        <v-card-title class="my-1">
            {{ product.name }}
            <v-spacer></v-spacer>
            {{ toBrazilianCurrency(product.price) }}
        </v-card-title>
        <v-card-actions class="my-4">
            <v-spacer></v-spacer>
            <v-btn icon @click="edit(product.uid)">
                <v-icon dark> mdi-pencil </v-icon>
            </v-btn>
            <!-- <ProductEditModal :open="editProductDialog" :productData="product" @close="editProductDialog = false" @on-create="reloadProducts($event)"></ProductEditModal> -->
            <v-btn icon @click="remove(product.uid)"> <v-icon dark> mdi-delete </v-icon> </v-btn>
            <v-btn v-if="product.description" :icon="showDescription ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="showDescription = !showDescription"></v-btn>
        </v-card-actions>
        <v-expand-transition>
            <div v-show="showDescription">
                <v-divider></v-divider>
                <v-card-text>
                    {{ product.description }}
                </v-card-text>
            </div>
        </v-expand-transition>
    </v-card>
</template>

<script>
import StringUtils from '@/utils/string.util';
import { defineComponent } from 'vue';
// import ProductEditModal from './ProductEditModal.vue';

export default defineComponent({
    name: 'ProductCard',
    props: {
        product: { type: Object, default: () => {} },
    },
    data: () => ({
        editProductDialog: false,
        showDescription: false,
    }),
    methods: {
        remove(uid) {
            this.$emit('remove', uid);
        },
        edit(uid) {
            this.$emit('edit', uid);
        },
        toBrazilianCurrency(value) {
            return StringUtils.convertIntoCurrency(value);
        },
        reloadProducts(newProduct) {
            if (newProduct) {
                this.editProductDialog = false;
            }
        },
    },
    // components: {
    //     ProductEditModal,
    // },
});
</script>

<style>
.v-btn {
    color: #009688;
}
</style>
